// components/atoms/Input.js
import React, { useState, useEffect } from 'react';

const Input = ({ 
  label, 
  value, 
  onChange, 
  name,
  type = 'number', 
  min, 
  max, 
  step = 1,
  placeholder,
  className = '',
  helperText,
  disabled = false,
  error = '',
  showError = true
}) => {
  const id = `input-${name || label.replace(/\s+/g, '-').toLowerCase()}`;
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState('');

  // Sincronizar con el valor del padre
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Validar valor actual
  useEffect(() => {
    if (inputValue !== '' && inputValue !== undefined) {
      validateValue(inputValue);
    }
  }, [inputValue, min, max]);

  const validateValue = (val) => {
    if (val === '' || val === undefined) {
      setLocalError('');
      return true;
    }

    const numValue = parseInt(val, 10);
    
    if (isNaN(numValue)) {
      setLocalError('Debe ser un número válido');
      return false;
    }

    if (min !== undefined && numValue < min) {
      setLocalError(`El valor mínimo es ${min}`);
      return false;
    }

    if (max !== undefined && numValue > max) {
      setLocalError(`El valor máximo es ${max}`);
      return false;
    }

    setLocalError('');
    return true;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Si está vacío, notificar al padre
    if (newValue === '') {
      if (onChange && name) {
        onChange(name, '', true); // true = está vacío
      }
      return;
    }
    
    // Convertir a número y validar
    const numValue = parseInt(newValue, 10);
    
    if (!isNaN(numValue)) {
      // No aplicar límites aquí, solo validar
      const isValid = validateValue(numValue);
      
      if (onChange && name) {
        onChange(name, numValue, isValid);
      }
    } else {
      // No es un número, pero permitimos que el usuario siga escribiendo
      if (onChange && name) {
        onChange(name, newValue, false);
      }
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    
    // Si el campo está vacío o no es válido, mantenerlo vacío
    // El usuario debe ingresar un valor manualmente
    if (inputValue === '' || localError) {
      // No hacer nada, dejar que el usuario corrija
      return;
    }

    // Solo establecer valor si es válido
    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue) && validateValue(numValue)) {
      if (onChange && name) {
        onChange(name, numValue, true);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Seleccionar todo el texto al enfocar
    setTimeout(() => {
      const input = document.getElementById(id);
      if (input) input.select();
    }, 100);
  };

  const handleKeyDown = (e) => {
    // Permitir todas las teclas de control y navegación
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End', 'Control', 'Alt', 'Shift', 'Meta'
    ];

    if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }

    // Solo permitir números, punto y signo negativo (si aplica)
    const isNumber = /^\d$/.test(e.key);
    const isDecimal = e.key === '.' && type === 'number';
    const isMinus = e.key === '-' && min < 0;

    if (!isNumber && !isDecimal && !isMinus) {
      e.preventDefault();
    }
  };

  const displayError = error || localError;
  const hasError = !!displayError && showError;

  return (
    <div className={`w-full space-y-2 ${className}`}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={isFocused ? inputValue : (inputValue || '')}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3 border rounded-lg 
            transition-colors duration-200 outline-none shadow-sm 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            hover:border-gray-400 
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${isFocused ? 'border-blue-500' : 'border-gray-300'}
            ${hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            text-gray-900 font-medium placeholder-gray-400
            bg-white
          `}
        />
        
        {!isFocused && inputValue === '' && placeholder && (
          <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
            <span className="text-gray-400">{placeholder}</span>
          </div>
        )}
      </div>
      
      {(helperText || hasError) && (
        <div className="mt-1">
          {hasError && (
            <p className="text-xs text-red-600 font-medium">{displayError}</p>
          )}
          {helperText && !hasError && (
            <p className="text-xs text-gray-500">{helperText}</p>
          )}
        </div>
      )}
      
      <div className="flex justify-between text-xs text-gray-400">
        <span>Mín: {min}</span>
        <span>Máx: {max}</span>
      </div>
    </div>
  );
};

export default Input;