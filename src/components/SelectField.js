import Select from 'react-select';

const SelectField = ({ options, isMulti, field, placeholder, form }) => {
  return (
    <Select
      options={options}
      isMulti={isMulti}
      name={field.name}
      placeholder={placeholder}
      onChange={(arr, rest) => form.setFieldValue('hobbies', arr)}
    />
  );
};

export default SelectField;
