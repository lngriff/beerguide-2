import { useRef, useEffect } from "react";
import { runTree } from "./TreeGenerator";
import linkJSON from '../data/links.json'

export function Tree({data, setBeer}) {
    const containerRef = useRef(null);

    useEffect(() => {
      let destroyFn;

      const nodes = data.nodes.map((d) => ({...d}));
      const links = linkJSON.links.map((d) => ({...d}));

      if (containerRef.current) {
        const { destroy } = runTree(containerRef.current, nodes, links, setBeer);
        destroyFn = destroy;
      }
      return destroyFn;
      // tired of the dependency warning here but adding setBeer to the deps makes this thing re-render each time
    }, [data.links, data.nodes]);

    return <div ref={containerRef} className="container"/>;
  }

