import { assign, enqueueActions, setup } from 'xstate';
import { ACTOR_CONSTANTS } from '../constants';
import { initialConfig } from '../../config';

export const nodeItemMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    spawnChildNodes: assign(({ context, self, spawn }) => {
      context.props.nodes.forEach((currentItem: any) => {
        const childRef = spawn(nodeItemMachine, {
          id: currentItem.id,
          systemId: currentItem.id,
          input: {
            internalRefs: {
              parent: self,
              children: [],
            },
            props: {
              id: currentItem.id,
              nodes: currentItem.children || [],
            },
          },
        } as any);
        context.internalRefs.children = [...context.internalRefs.children, childRef];
      });
    }),
  },
}).createMachine({
  context: ({ input }: any) => {
    return {
      internalRefs: {
        parent: input?.internalRefs?.parent,
        children: [],
      },
      props: {
        id: input?.props?.id,
        nodes: input?.props?.nodes || [],
      },
    };
  },
  entry: enqueueActions(({ enqueue }) => {
    enqueue('spawnChildNodes');
  }),
});
