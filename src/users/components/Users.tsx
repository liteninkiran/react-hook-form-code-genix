import { useState } from 'react';

export const Users = () => {
  const [input, setInput] = useState('Default Value');
  return (
    <input value={input} placeholder={'Enter a value'} onChange={(e) => setInput(e.target.value) } />
  );
}
