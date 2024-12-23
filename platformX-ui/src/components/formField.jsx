import React,{useEffect,useRef} from 'react';
import { Field,useFormikContext  } from 'formik';
import PropTypes from "prop-types";
import "../styles/user-style.css";
import {
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Adjust import based on your library
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


const FormFieldComponent = ({ fieldConfig, touchedFields, validationErrors, setFieldValue, fieldValue,handleChange }) => {
  const { name, label, type = 'text', options = [], onChange } = fieldConfig;
  let disabled = (fieldConfig.disabled) ? fieldConfig.disabled : false;
  const { values } = useFormikContext(); // Access Formik context
  const fieldRef = useRef(null);

  const shouldDisableDate = (date) => {
    if(values['startingDate'] && values['endingDate'] ===''){
      const startingDate = new Date(values['startingDate']);
      startingDate.setDate(startingDate.getDate()+1);
        if(date < startingDate){
          return true;
        }
    }
    else if(values['endingDate'] && values['startingDate'] === ''){
      const endingDate = new Date(values['endingDate']);
      endingDate.setDate(endingDate.getDate()-1);
        if(date > endingDate){
          return true;
        }
    }
    else if(values['endingDate'] && values['startingDate']){
      const startingDate = new Date(values['startingDate']);
      startingDate.setDate(startingDate.getDate());
        if(date > startingDate){
          return true;
        }
    }
  };

  const handleFieldChange = () => {
    // Handle field change logic
    onChange(); // Mark as having unsaved changes
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the field
      if (fieldRef.current && !fieldRef.current.contains(event.target)) {
        // Reset field value or handle discard logic
        console.log("here");
        //setFieldValue(name, ''); // Reset to an empty string or your desired default
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [name, setFieldValue]);

 // console.log("values",values);

  return (

    <Grid item xs={6}>
      <div ref={fieldRef}>
      <Field fullWidth name={name}>
        {({ field }) => (
          <>
            {type === 'date' ? (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={label}
                value={fieldValue ? new Date(fieldValue) : ""} // Convert fieldValue to a Date object
                onChange={(newValue) => {
                  setFieldValue(name, newValue);
                  // Call custom onChange if provided
                  if (onChange) {
                    onChange(newValue);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    disabled={disabled}
                    error={touchedFields[name] && !!validationErrors[name]}
                    helperText={touchedFields[name] && validationErrors[name]}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
                shouldDisableDate={(date) => shouldDisableDate(date)} // Pass values from Formik
              /></LocalizationProvider>
            ) : (
          <TextField
            {...field}
            label={label}
            fullWidth
            select={type === 'select'}
            {...(fieldValue ? { value: fieldValue } : {})}
            error={touchedFields[name] && !!validationErrors[name]}
            helperText={touchedFields[name] && validationErrors[name]}
            InputLabelProps={{ shrink: true }}
            disabled={disabled}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) {
                onChange(e, setFieldValue);
                handleChange && handleChange(e);
              }
            }}
          >
            {type === 'select' &&
              options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </TextField>
         )}
         </>
       )}
     </Field>
      </div>
     </Grid>
  );
};

FormFieldComponent.propTypes = {
  fieldConfig: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'select', 'lookup','date']),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    onChange: PropTypes.func,
  }).isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  fieldValue: PropTypes.any,
};

export default FormFieldComponent;