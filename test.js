const React = require('react');
const { renderToString } = require('react-dom/server');
const { useChat } = require('@ai-sdk/react');

function Test() {
  const chat = useChat();
  console.log(Object.keys(chat));
  return null;
}
renderToString(React.createElement(Test));
