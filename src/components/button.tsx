import React, { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

interface ButtonTextProps {
  children: ReactNode;
}

interface ButtonIconProps {
  children: ReactNode;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className="h-12 bg-indigo-400 rounded-md items-center justify-center flex-row"
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

function ButtonText({ children, ...props }: ButtonTextProps) {
  return (
    <Text className="text-black font-semibold text-base mx-2" {...props}>
      {children}
    </Text>
  );
}

function ButtonIcon({ children }: ButtonIconProps) {
  return children;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
