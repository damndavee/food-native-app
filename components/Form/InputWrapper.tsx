import { ReactNode } from "react";
import { StyleSheet, Text, View } from 'react-native';

export type InputWrapperProps = {
    children: ReactNode;
    style: object;
}

const InputWrapper = (props: InputWrapperProps) => {
  return (
    <View style={props.style}>
      {props.children}
    </View>
  )
}

export default InputWrapper;

const styles = StyleSheet.create({})