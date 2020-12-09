import React from "react";
import { StyleSheet } from "react-native";
import { TextInput, Text } from "react-native-paper";

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, setErrors, touched, setFieldTouched },
    label,
    icon,
    secureTextEntry,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        secureTextEntry={secureTextEntry}
        error={hasError}
        left={
          icon ? (
            <TextInput.Icon name={icon} style={styles.icon} disabled />
          ) : null
        }
        underlineColor="grey"
        mode="outlined"
        label={label}
        style={[styles.textInput, hasError && styles.errorInput]}
        value={value}
        onChangeText={(text) => {
          onChange(name)(text);
        }}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    margin: 7,
    height: 35,
    backgroundColor: "white",
    flex: 1,
  },
  icon: {
    position: "absolute",
    top: "-8px",
  },
  errorText: {
    marginLeft: 10,
    fontSize: 12,
    color: "red",
  },
  errorInput: {
    borderColor: "red",
  },
});

export default CustomInput;
