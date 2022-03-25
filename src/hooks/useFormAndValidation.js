import {useState, useCallback} from 'react';

function useFormAndValidation({defaultValues, defaultValid}) {
  const [ values, setValues ] = useState(defaultValues);
  const [ errors, setErrors ] = useState(defaultValues);
  const [ isValid, setIsValid ] = useState(defaultValid);

  const handleChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback((newValues = defaultValues, newErrors = defaultValues, newIsValid = defaultValid) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setErrors, setIsValid };
}

export default useFormAndValidation;