


export const getType = (type => {
  return `Patreon${type.charAt(0).toUpperCase()}${type.slice(1)}`
})


export const renameAttributes = (attributes => {
  const node = {};
  for(const key of Object.keys(attributes)) {

    const keyElements = key.split('_');
    const newKey = keyElements.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
    });

    node[newKey] = attributes[key];
  }

  return node;

})
