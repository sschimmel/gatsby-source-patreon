import { getType, renameAttributes } from './nodes'
import ApiClient from './apiClient';

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }, configOptions) => {
  const { createNode } = actions;

  const client = new ApiClient({configOptions});

  return client.fetchAll().then(data => {
    data.forEach(node => {

      const type = getType(node.type);
      const nodeId = createNodeId(`${type}-${node.id}`)

      const nodeRawData = renameAttributes(node.attributes);
      nodeRawData[`${node.type}Id`] = node.id;

      const nodeContent = JSON.stringify(nodeRawData)
      const nodeData = Object.assign({}, nodeRawData, {
        id: nodeId,
        parent: null,
        children: [],
        internal: {
          type: type,
          content: nodeContent,
          contentDigest: createContentDigest(nodeRawData),
        },
      });

      createNode(nodeData);
    });

  });
}
