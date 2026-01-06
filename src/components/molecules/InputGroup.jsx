// components/molecules/InputGroup.js
import React, { useState, useEffect } from 'react';
import Input from '../atoms/Input';

const InputGroup = ({ 
  workDays, setWorkDays, 
  restDays, setRestDays, 
  inductionDays, setInductionDays, 
  totalDrillingDays, setTotalDrillingDays,
  disabled = false,
  errors = {}
}) => {
  const [localErrors, setLocalErrors] = useState({
    workDays: '',
    restDays: '',
    inductionDays: '',
    totalDrillingDays: ''
  });

  // Sincronizar errores del padre
  useEffect(() => {
    setLocalErrors(prev => ({
      ...prev,
      ...errors
    }));
  }, [errors]);

  const handleInputChange = (field, value, isValid) => {
    // Actualizar error local
    if (isValid === false) {
      setLocalErrors(prev => ({
        ...prev,
        [field]: 'Valor inválido'
      }));
    } else {
      setLocalErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Llamar a la función correspondiente
    switch(field) {
      case 'workDays':
        setWorkDays(field, value, isValid);
        break;
      case 'restDays':
        setRestDays(field, value, isValid);
        break;
      case 'inductionDays':
        setInductionDays(field, value, isValid);
        break;
      case 'totalDrillingDays':
        setTotalDrillingDays(field, value, isValid);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Input
          name="workDays"
          label="Días de trabajo (N)"
          value={workDays}
          onChange={(field, value, isValid) => handleInputChange(field, value, isValid)}
          min={5}
          max={30}
          helperText="Rango: 5-30 días"
          disabled={disabled}
          placeholder="14"
          error={localErrors.workDays}
        />
        
        <Input
          name="restDays"
          label="Días libres totales (M)"
          value={restDays}
          onChange={(field, value, isValid) => handleInputChange(field, value, isValid)}
          min={4}
          max={14}
          helperText="Rango: 4-14 días"
          disabled={disabled}
          placeholder="7"
          error={localErrors.restDays}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Input
          name="inductionDays"
          label="Días de inducción"
          value={inductionDays}
          onChange={(field, value, isValid) => handleInputChange(field, value, isValid)}
          min={1}
          max={5}
          helperText="Rango: 1-5 días"
          disabled={disabled}
          placeholder="5"
          error={localErrors.inductionDays}
        />
        
        <Input
          name="totalDrillingDays"
          label="Total días de perforación"
          value={totalDrillingDays}
          onChange={(field, value, isValid) => handleInputChange(field, value, isValid)}
          min={30}
          max={180}
          helperText="Rango: 30-180 días"
          disabled={disabled}
          placeholder="30"
          error={localErrors.totalDrillingDays}
        />
      </div>
    </div>
  );
};

export default InputGroup;