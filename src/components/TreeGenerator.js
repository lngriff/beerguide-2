// build beer tree
import * as d3 from 'd3';

export function runTree(container, nodes, links, onclick) {
    const containerRect = container.getBoundingClientRect();
    const height = containerRect.height;
    const width = containerRect.width;

    // will want a way to change this up later
    // cause the SRM colors are cool but not super readable, unfortunately
    const color = (node) => { return node.color }

    const size = (node) => { return node.size }

    const simulation = d3
        .forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(d => { return d.size === 15 ? 50 : 100 }))
        .force('charge', d3.forceManyBody().strength(-500))
        .force('x', d3.forceX())
        .force('y', d3.forceY());

    // remove the entire svg before rebuilding it
    d3.select('svg').remove()

    const svg = d3
        .select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%;')
        //.attr('style', 'max-height: 100%;')
        .attr('viewBox', [-width / 2, -height / 2, width, height])

    const link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke-width', 1);

    const node = svg
        .append('g')
        .attr('class', 'beers')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('id', d => { return d.id })
        .attr('r', size)
        .attr('fill', color)
        .on('click', data => clickHandler(data))

    // TODO make labels toggle-able for the smaller sizes
    // is there a way to bundle text and circle together..? so i can apply force to all..
    const label = svg.append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(nodes)
        .enter()
        .append('text')
        .attr('id', d => { return d.id })
        .attr('text-anchor', d => { return d.size === 15 ? 'right' : 'middle'})
        .attr('dominant-baseline', 'central')
        .attr('dx', d => { return d.size === 15 ? 15 : 0})
        .text(d => {return d.label;})
        .on('click', d => clickHandler(d))


        let prevSelection = null
        let selected = null
        function clickHandler(clicked) {
          selected = clicked.target.id;
          onclick(selected)
  
          const nodes = d3.selectAll('circle')._groups[0]
          const labels = d3.selectAll('text')._groups[0]
          let nodeToChange, labelToChange;
          if (clicked.target.nodeName === 'circle') {
            nodeToChange = clicked.target;
            for (let label of labels) {
              if (label.id === selected) {
                labelToChange = label
                break;
              }
            }
          } else if (clicked.target.nodeName === 'text') {
            labelToChange = clicked.target;

            for (let node of nodes) {
              if (node.id === selected) {
                nodeToChange = node;
                break
              }
            }
          }
          nodeToChange.setAttribute('stroke', '#000')
          nodeToChange.setAttribute('stroke-width', 6)
          labelToChange.setAttribute('font-weight', 'bold')

          if (prevSelection !== null) {  
            for (let node of nodes) {
              if (node.id === prevSelection) {
                node.setAttribute('stroke', '#fff')
                node.setAttribute('stroke-width', 0)
                break;
              }
            }
            for (let label of labels) {
              if (label.id === prevSelection) {
                label.setAttribute('font-weight', 'normal')
                break;
              }
            }
          }

          console.log(`prev select ${prevSelection} and current selection ${selected}`)
          prevSelection = selected;
        }
    
    // TODO add drag, zoom?
    simulation.on('tick', () => {
        //update link positions
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);
    
        // update node positions
        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
    
        // update label positions
        label
          .attr('x', d => { return d.x; })
          .attr('y', d => { return d.y; })
      });
    
      return {
        destroy: () => {
          simulation.stop();
        },
        nodes: () => {
          return svg.node();
        }
      };
}