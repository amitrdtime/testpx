import React from 'react';
import { Formik, Form } from 'formik';
import { Grid, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";
import FormFieldComponent from './formField';

const FormComponent = ({ initialValues, validationSchema, onSubmit, formFields, onClose, title,submitButtonLabel, cancelButtonLabel }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, setFieldValue }) => (
                <Form>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '736px',
                            margin: '0 auto',
                            minHeight: '500px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            sx={{
                                padding: '0px 10px',
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
                                padding: '20px',
                            }}
                        >
                            <Grid container spacing={4}>
                                {formFields.map((fieldConfig) => (
                                    <FormFieldComponent
                                        key={fieldConfig.name}
                                        fieldConfig={fieldConfig}
                                        touchedFields={touched}
                                        validationErrors={errors}
                                        setFieldValue={setFieldValue}
                                    />
                                ))}
                            </Grid>
                        </Box>

                        <Box
                            sx={{
                                padding: '20px',
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

FormComponent.propTypes = {
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
export default FormComponent;