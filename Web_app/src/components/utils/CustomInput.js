import React from "react";
import { StyleSheet } from "react-native";
import { TextInput, Text } from "react-native-paper";

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    label,
    icon,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
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
        onChangeText={(text) => onChange(name)(text)}
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
    margin: 10,
    height: 40,
    backgroundColor: "white",
    flex: 1,
  },
  icon: {
    position: "absolute",
    top: "-8px",
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
  errorInput: {
    borderColor: "red",
  },
});

export default CustomInput;
