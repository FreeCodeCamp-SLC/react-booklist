import { useState } from 'react';

const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if its a number and convert
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(e.target.value, 10);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that changed
      [e.target.name]: value,
    });
  }
  return { values, updateValue };
};

export default useForm;
