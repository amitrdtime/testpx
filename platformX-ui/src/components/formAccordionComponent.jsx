import React,{useState, useRef} from 'react';
import { Formik, Form } from 'formik';
import { Grid, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";
import FormFieldComponent from './formField';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';




const FormAccordionComponent = ({ initialValues, validationSchema, onSubmit, formFields="", onClose, title,submitButtonLabel, cancelButtonLabel,showExpandSummary,onChange }) => {
    
    const [formValues, setFormValues] = useState(initialValues);
    const dialogRef = useRef(null);
  
    const handleFormChange = (newValues) => {
      setFormValues(newValues);
    };
  
    let camelCaseToTitleCase = (str) => {
        // Insert a space before all uppercase letters
        let result = str.replace(/([A-Z])/g, ' $1');
        // Capitalize the first letter
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

   

    
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            
        >
            {({ errors, touched, setFieldValue, isValid, dirty }) => (
                <Form>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '736px',
                            margin: '0 auto',
                            height: '520px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Box
                            sx={{
                                padding: '0px 5px',
                                marginLeft: '10px',
                                borderBottom: '1px solid #ddd',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: "0px !important"
                            }}
                        >
                            <h2 className="">{title}</h2>
                            <IconButton onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                overflowY: 'auto',
                                padding: '5px',
                            }}
                        >
                            {formFields.map((formField) => (
                                Object.keys(formField).map((fieldKey) => (
                                    <Accordion defaultExpanded>
                                   
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <Typography>{camelCaseToTitleCase(fieldKey)}</Typography>
                                        </AccordionSummary>

                                        <AccordionDetails>
                                        <Typography>
                                            <Grid container spacing={4}>
                                                {formField[fieldKey].map((fieldConfig) => (
                                                    <FormFieldComponent
                                                        key={fieldConfig.name}
                                                        fieldConfig={fieldConfig}
                                                        fieldValue={fieldConfig.value ? fieldConfig.value: ''}
                                                        touchedFields={touched}
                                                        validationErrors={errors}
                                                        setFieldValue={setFieldValue}
                                                        onChange={handleFormChange} // Call this prop when the form changes
                                                    />
                                                ))}
                                            </Grid>
                                            
                                        </Typography>
                                        </AccordionDetails>
                                        
                                    </Accordion>
                                ))
                            ))}
                            
                        </Box>

                        <Box
                            sx={{
                                padding: '10px 20px',
                                borderTop: '1px solid #ddd',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '10px',
                            }}
                        >
                            <Button
                                variant="outlined"
                                onClick={onClose}
                                sx={{
                                    borderColor: 'black',
                                    color: 'black',
                                    width: '91px',
                                    height: '46px',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                }}
                            >
                                 {cancelButtonLabel}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{
                                    width: '91px',
                                    height: '46px',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                }}
                                disabled={!isValid || !dirty } // Disable if form is not valid or not modified
                            >
                                {submitButtonLabel}
                            </Button>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

FormAccordionComponent.propTypes = {
    initialValues: PropTypes.object.isRequired, 
    validationSchema: PropTypes.object.isRequired, 
    onSubmit: PropTypes.func.isRequired, 
    formFields: PropTypes.arrayOf(      
      PropTypes.shape({
        name: PropTypes.string.isRequired,  
        label: PropTypes.string.isRequired, 
        type: PropTypes.string.isRequired,  
        options: PropTypes.arrayOf(        
          PropTypes.shape({
            label: PropTypes.string.isRequired, 
            value: PropTypes.string.isRequired,
          })
        ),
      })
    ).isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired, 
    submitButtonLabel: PropTypes.string, 
    cancelButtonLabel: PropTypes.string, 
  };
export default FormAccordionComponent;