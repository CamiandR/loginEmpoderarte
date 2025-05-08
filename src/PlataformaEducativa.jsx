import React, { useState, useEffect } from 'react';
import { Heart, Eye, EyeOff, Star, User, Mail, Lock, ArrowRight, ArrowLeft, ChevronRight, Menu } from 'lucide-react';

const PandoraLogin = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [stage, setStage] = useState('welcome');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pageEffect, setPageEffect] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    username: '',
    confirmPassword: '',
    resetEmail: ''
  });
  
  // Configuración del avatar
  const [avatarConfig, setAvatarConfig] = useState({
    skinColor: '#f5d0ba',
    hairColor: '#4a2b13',
    eyeColor: '#72482e',
    accessory: 'glasses',
    background: '#ff69b4'
  });
  
  // Validación de errores
  const [errors, setErrors] = useState({});

  // Opciones de colores de piel
  const skinColors = ['#f5d0ba', '#e8b998', '#c68642', '#8d5524', '#332218', '#fee3d4'];
  
  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Comprobar al cargar y cuando cambie el tamaño de la ventana
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Cambiar color de piel con animación
  const changeSkinColor = (color) => {
    setAvatarConfig({...avatarConfig, skinColor: color});
    setPageEffect(true);
    setTimeout(() => setPageEffect(false), 300);
  };
  
  // Manejo de cambios en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validación en tiempo real
    validateField(name, value);
  };

  // Validación de campos
  const validateField = (name, value) => {
    let newErrors = {...errors};
    
    switch(name) {
      case 'email':
      case 'resetEmail':
        if (!value) {
          newErrors[name] = 'El correo es requerido';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors[name] = 'Correo inválido';
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors[name] = 'La contraseña es requerida';
        } else if (value.length < 6) {
          newErrors[name] = 'Mínimo 6 caracteres';
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'confirmPassword':
        if (!value) {
          newErrors[name] = 'Confirma tu contraseña';
        } else if (value !== formData.password) {
          newErrors[name] = 'Las contraseñas no coinciden';
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'name':
      case 'username':
        if (!value) {
          newErrors[name] = `${name === 'name' ? 'El nombre' : 'El usuario'} es requerido`;
        } else {
          delete newErrors[name];
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
  };
  
  // Alternar visibilidad de contraseña
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  // Navegación entre etapas con animación
  const goToRegister = () => {
    setPageEffect(true);
    setTimeout(() => {
      setStage('register');
      setPageEffect(false);
    }, 500);
  };
  
  const goToWelcome = () => {
    setPageEffect(true);
    setTimeout(() => {
      setStage('welcome');
      setActiveTab('login');
      setPageEffect(false);
    }, 500);
  };
  
  // Cambio de pestañas con animación
  const changeTab = (tab) => {
    setPageEffect(true);
    setTimeout(() => {
      setActiveTab(tab);
      setPageEffect(false);
    }, 300);
  };
  
  // Envío de formulario
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Validación completa
    let isValid = true;
    let newErrors = {};
    
    if (activeTab === 'login') {
      if (!formData.email) {
        newErrors.email = 'El correo es requerido';
        isValid = false;
      }
      if (!formData.password) {
        newErrors.password = 'La contraseña es requerida';
        isValid = false;
      }
    } else if (stage === 'register') {
      if (!formData.name) {
        newErrors.name = 'El nombre es requerido';
        isValid = false;
      }
      if (!formData.username) {
        newErrors.username = 'El usuario es requerido';
        isValid = false;
      }
      if (!formData.email) {
        newErrors.email = 'El correo es requerido';
        isValid = false;
      }
      if (!formData.password) {
        newErrors.password = 'La contraseña es requerida';
        isValid = false;
      }
      if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
        isValid = false;
      }
    } else if (activeTab === 'reset') {
      if (!formData.resetEmail) {
        newErrors.resetEmail = 'El correo es requerido';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    
    if (isValid) {
      // Simulación de envío exitoso
      alert(`Formulario de ${activeTab === 'login' ? 'inicio de sesión' : activeTab === 'reset' ? 'recuperación' : 'registro'} enviado con éxito`);
      
      // Efecto de página
      setPageEffect(true);
      setTimeout(() => {
        setPageEffect(false);
      }, 500);
    }
  };

  // Componente de círculos de nivel
  const LevelCircles = () => (
    <div className="flex flex-col items-center">
      <div className={`relative ${isMobile ? 'w-40 h-40' : 'w-64 h-64'} mb-6 transform transition-all duration-300 hover:scale-105`}>
        <div className="absolute inset-0 bg-pink-100 rounded-full animate-pulse"></div>
        <div className="absolute inset-8 bg-pink-200 rounded-full"></div>
        <div className="absolute inset-16 bg-pink-300 rounded-full"></div>
        <div className="absolute inset-24 bg-pink-400 rounded-full"></div>
        <div className="absolute inset-32 bg-pink-500 rounded-full"></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-white rounded-full flex items-center justify-center shadow-lg`}>
          <Heart size={isMobile ? 18 : 24} className="text-pink-500" />
        </div>
      </div>
      
      <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-700 mb-2 font-bold`}>Descubre los 5 niveles</h2>
      
      <div className="flex space-x-3 mt-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <div 
            key={level} 
            className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-full flex items-center justify-center shadow-md transform transition-all duration-200 hover:scale-110`}
            style={{ backgroundColor: level === 1 ? '#FFB6C1' : '#FF69B4' }}
          >
            <span className="text-xs font-bold text-white">{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
  
  // Componente mejorado para el avatar
  const Avatar = ({ config }) => {
    const scale = isMobile ? 0.8 : 1;
    
    return (
      <div className={`relative ${isMobile ? 'w-36 h-36' : 'w-48 h-48'} rounded-2xl overflow-hidden bg-white border-4 border-white shadow-lg transform transition-all duration-300 hover:scale-105`} 
           style={{ backgroundColor: config.background }}>
        {/* Cara */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2" style={{ transform: `translateX(-50%) scale(${scale})` }}>
          <div className="w-32 h-36 rounded-3xl" style={{ backgroundColor: config.skinColor }}></div>
          
          {/* Ojos */}
          <div className="absolute top-8 left-6 w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: config.eyeColor }}></div>
          </div>
          <div className="absolute top-8 right-6 w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: config.eyeColor }}></div>
          </div>
          
          {/* Accesorio - Gafas */}
          {config.accessory === 'glasses' && (
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2">
              <div className="w-28 h-8 border-2 border-gray-800 rounded-full flex justify-between px-1">
                <div className="w-8 h-7 rounded-full border-2 border-gray-800"></div>
                <div className="w-8 h-7 rounded-full border-2 border-gray-800"></div>
              </div>
            </div>
          )}
          
          {/* Boca */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-10 h-3 rounded-lg bg-pink-400"></div>
          
          {/* Pelo */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-16 -mt-6" 
               style={{ backgroundColor: config.hairColor, borderRadius: '50% 50% 0 0' }}></div>
        </div>
      </div>
    );
  };

  // Renderizado de la versión móvil
  const renderMobile = () => {
    return (
      <div className="flex flex-col min-h-screen w-full">
        {/* Cabecera */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 text-white">
          <h1 className="text-xl font-bold text-center">Pandora</h1>
        </div>
        
        {/* Contenido principal */}
        <div className="flex-1 bg-gradient-to-r from-cyan-200 to-pink-200 p-4 overflow-y-auto">
          <div className={`bg-white rounded-xl shadow-lg p-6 ${pageEffect ? 'scale-95' : 'scale-100'} transition-all duration-500`}>
            {stage === 'welcome' ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4 text-pink-500">Bienvenida a Pandora</h1>
                  <LevelCircles />
                  
                  <button
                    onClick={goToRegister}
                    className="mt-6 py-3 px-6 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-bold rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg w-full"
                  >
                    Comienza tu viaje
                  </button>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  {/* Tabs de navegación */}
                  <div className="flex justify-center mb-4">
                    <div className="flex bg-gray-100 p-1 rounded-full">
                      <button 
                        className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${activeTab === 'login' ? 'bg-white shadow-md text-pink-500' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => changeTab('login')}
                      >
                        Ingresar
                      </button>
                      <button 
                        className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${activeTab === 'reset' ? 'bg-white shadow-md text-pink-500' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => changeTab('reset')}
                      >
                        Recuperar
                      </button>
                    </div>
                  </div>
                  
                  {/* Formulario de inicio de sesión */}
                  {activeTab === 'login' && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-gray-800 text-center mb-2">¡Bienvenida de nuevo!</h2>
                      
                      <div>
                        <div className="flex items-center mb-1">
                          <Mail size={16} className="text-gray-400 mr-2" />
                          <label htmlFor="email-mobile" className="block text-gray-700 text-sm font-medium">
                            Correo electrónico
                          </label>
                        </div>
                        <input
                          type="email"
                          id="email-mobile"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                          placeholder="tu@correo.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-1">
                          <Lock size={16} className="text-gray-400 mr-2" />
                          <label htmlFor="password-mobile" className="block text-gray-700 text-sm font-medium">
                            Contraseña
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            id="password-mobile"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-gray-50 border ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                            placeholder="Tu contraseña secreta"
                          />
                          <button 
                            type="button" 
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            onClick={togglePasswordVisibility}
                          >
                            {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                        
                        <div className="flex justify-end mt-2">
                          <button 
                            type="button" 
                            className="text-xs text-pink-500 hover:text-pink-600 font-medium"
                            onClick={() => changeTab('reset')}
                          >
                            ¿Olvidaste tu contraseña?
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember-mobile"
                          className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-mobile" className="ml-2 block text-sm text-gray-600">
                          Recordar sesión
                        </label>
                      </div>
                      
                      <button
                        onClick={handleSubmit}
                        className="w-full py-3 px-4 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold rounded-xl transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-lg flex items-center justify-center"
                      >
                        <span>Ingresar</span>
                        <ArrowRight size={18} className="ml-2" />
                      </button>
                      
                      <div className="text-center text-gray-500 text-sm">
                        ¿No tienes cuenta? 
                        <button 
                          onClick={goToRegister} 
                          className="ml-1 text-pink-500 font-medium"
                        >
                          Regístrate aquí
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Formulario de recuperación de contraseña */}
                  {activeTab === 'reset' && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-gray-800 text-center mb-2">¿Olvidaste tu contraseña?</h2>
                      
                      <div className="p-4 bg-pink-50 rounded-lg">
                        <p className="text-gray-600 text-sm">
                          No te preocupes, nos pasa a todos. Ingresa tu correo electrónico y te enviaremos instrucciones para recuperar tu cuenta.
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-1">
                          <Mail size={16} className="text-gray-400 mr-2" />
                          <label htmlFor="resetEmail-mobile" className="block text-gray-700 text-sm font-medium">
                            Correo electrónico
                          </label>
                        </div>
                        <input
                          type="email"
                          id="resetEmail-mobile"
                          name="resetEmail"
                          value={formData.resetEmail}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-gray-50 border ${errors.resetEmail ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                          placeholder="tu@correo.com"
                        />
                        {errors.resetEmail && <p className="text-red-400 text-xs mt-1">{errors.resetEmail}</p>}
                      </div>
                      
                      <button
                        onClick={handleSubmit}
                        className="w-full py-3 px-4 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold rounded-xl transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-lg flex items-center justify-center"
                      >
                        <span>Enviar instrucciones</span>
                        <ArrowRight size={18} className="ml-2" />
                      </button>
                      
                      <div className="text-center">
                        <button 
                          onClick={() => changeTab('login')} 
                          className="text-sm text-gray-500 hover:text-pink-500 font-medium"
                        >
                          Volver al inicio de sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-xl font-bold mb-4 text-pink-500">CREA TU PERSONAJE</h1>
                  
                  <Avatar config={avatarConfig} />
                  
                  <h3 className="text-gray-600 mt-4 mb-1 font-medium uppercase text-sm tracking-wider">ELIGE COLOR DE PIEL</h3>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {skinColors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${avatarConfig.skinColor === color ? 'border-pink-500 scale-110' : 'border-gray-200'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => changeSkinColor(color)}
                      ></button>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-2">¡Únete a la aventura!</h2>
                    
                    <div>
                      <div className="flex items-center mb-1">
                        <User size={16} className="text-gray-400 mr-2" />
                        <label htmlFor="name-mobile" className="block text-gray-700 text-sm font-medium">
                          Nombre completo
                        </label>
                      </div>
                      <input
                        type="text"
                        id="name-mobile"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.name ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                        placeholder="Tu nombre real"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-1">
                        <User size={16} className="text-gray-400 mr-2" />
                        <label htmlFor="username-mobile" className="block text-gray-700 text-sm font-medium">
                          Nombre de usuario
                        </label>
                      </div>
                      <input
                        type="text"
                        id="username-mobile"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.username ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                        placeholder="Cómo te conocerán"
                      />
                      {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-1">
                        <Mail size={16} className="text-gray-400 mr-2" />
                        <label htmlFor="email-mobile-reg" className="block text-gray-700 text-sm font-medium">
                          Correo electrónico
                        </label>
                      </div>
                      <input
                        type="email"
                        id="email-mobile-reg"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.email ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                        placeholder="tu@correo.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-1">
                        <Lock size={16} className="text-gray-400 mr-2" />
                        <label htmlFor="password-mobile-reg" className="block text-gray-700 text-sm font-medium">
                          Contraseña
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          id="password-mobile-reg"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                          placeholder="Mínimo 6 caracteres"
                        />
                        <button 
                          type="button" 
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                          onClick={togglePasswordVisibility}
                        >
                          {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-1">
                        <Lock size={16} className="text-gray-400 mr-2" />
                        <label htmlFor="confirmPassword-mobile" className="block text-gray-700 text-sm font-medium">
                          Confirmar contraseña
                        </label>
                      </div>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="confirmPassword-mobile"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                        placeholder="Repite tu contraseña"
                      />
                      {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms-mobile"
                        className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="terms-mobile" className="ml-2 block text-sm text-gray-600">
                        Acepto los <span className="text-pink-500 font-medium">términos y condiciones</span>
                      </label>
                    </div>
                    
                    <div className="flex flex-col mt-4 space-y-3">
                      <button
                        onClick={handleSubmit}
                        className="w-full py-3 px-4 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold rounded-xl transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-lg flex items-center justify-center"
                      >
                        <span>Crear mi cuenta</span>
                        <Heart size={18} className="ml-2" />
                      </button>
                      
                      <button
                        onClick={goToWelcome}
                        className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-full transform transition-all duration-200 hover:scale-105 hover:bg-gray-300 flex items-center justify-center"
                      >
                        <ArrowLeft size={16} className="mr-2" />
                        Volver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Renderizado de la versión desktop
  const renderDesktop = () => {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-cyan-200 to-pink-200 overflow-hidden">
        {/* Decoraciones de fondo */}
        <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-yellow-300 opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-purple-400 opacity-50"></div>
        <div className="absolute top-1/3 left-10 w-12 h-12 rounded-full bg-cyan-300 opacity-60"></div>
        
        {/* Libro */}
        <div className={`w-full max-w-5xl mx-auto flex shadow-2xl rounded-lg overflow-hidden transform transition-all duration-500 ${pageEffect ? 'scale-95 rotate-1' : 'scale-100'}`}
             style={{ 
               height: '80vh', 
               borderRadius: '24px',
               boxShadow: '0 20px 30px rgba(0,0,0,0.2), 0 0 80px rgba(255,105,180,0.3)'
             }}>
          
          {/* Página izquierda */}
          <div className="w-1/2 relative flex flex-col items-center justify-center" 
               style={{ 
                 background: 'linear-gradient(to bottom right, #ffffff, #f8f8f8)',
                 borderRight: '1px solid rgba(0,0,0,0.1)',
                 boxShadow: 'inset -10px 0 20px -10px rgba(0,0,0,0.1)'
               }}>
            
            {stage === 'welcome' ? (
              <div className="text-center px-8 py-12 w-full max-w-sm flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-8 text-pink-500">Bienvenida a Pandora</h1>
                <LevelCircles />
                
                <button
                  onClick={goToRegister}
                  className="mt-8 py-3 px-6 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-bold rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Comienza tu viaje
                </button>
              </div>
            ) : (
              <div className="text-center px-8 py-12 w-full max-w-sm flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-6 text-pink-500">CREA TU PERSONAJE</h1>
                
                <Avatar config={avatarConfig} />
                
                <h3 className="text-gray-600 mt-6 mb-2 font-medium uppercase text-sm tracking-wider">ELIGE COLOR DE PIEL</h3>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {skinColors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${avatarConfig.skinColor === color ? 'border-pink-500 scale-110' : 'border-gray-200'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => changeSkinColor(color)}
                    ></button>
                  ))}
                </div>
                
                <button
                  onClick={goToWelcome}
                  className="mt-4 py-2 px-4 bg-gray-200 text-gray-700 rounded-full transform transition-all duration-200 hover:scale-105 hover:bg-gray-300"
                >
                  <ArrowLeft size={16} className="inline mr-2" />
                  Volver
                </button>
              </div>
            )}
            
            {/* Decoración lateral e indicador de página */}
            <div className="absolute left-0 top-0 h-full w-12 flex flex-col items-center py-8">
              <div className="w-8 h-8 rounded-full bg-pink-500 mb-4 flex items-center justify-center text-white">
                <Star size={16} />
              </div>
              <div className="w-8 h-8 rounded-full bg-cyan-400 mb-4 flex items-center justify-center text-white">
                <User size={16} />
              </div>
            </div>
            
            {/* Indicador de página */}
            <div className="absolute bottom-6 text-gray-500 text-sm">
              <span className="px-4 py-2 rounded-full bg-white shadow-md">
                {stage === 'welcome' ? '1' : '2'} / 5
              </span>
            </div>
          </div>
          
          {/* Página derecha */}
          <div className="w-1/2 relative flex flex-col" 
               style={{ 
                 background: 'linear-gradient(to bottom, #ffffff, #f8f8f8)',
                 boxShadow: 'inset 10px 0 20px -10px rgba(0,0,0,0.1)'
               }}>
            
            {/* Tabs de navegación */}
            {stage === 'welcome' && (
              <div className="flex justify-center pt-8 px-6 mb-4">
                <div className="flex bg-gray-100 p-1 rounded-full">
                  <button 
                    className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${activeTab === 'login' ? 'bg-white shadow-md text-pink-500' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => changeTab('login')}
                  >
                    Ingresar
                  </button>
                  <button 
                    className={`py-2 px-4 rounded-full text-sm font-medium transition-all ${activeTab === 'reset' ? 'bg-white shadow-md text-pink-500' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => changeTab('reset')}
                  >
                    Recuperar
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex-1 px-8 pt-4 pb-6 overflow-y-auto">
              {/* Formulario de inicio de sesión */}
              {stage === 'welcome' && activeTab === 'login' && (
                <div className="space-y-6 h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">¡Bienvenida de nuevo!</h2>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <Mail size={16} className="text-gray-400 mr-2" />
                      <label htmlFor="email" className="block text-gray-700 text-sm font-medium">
                        Correo electrónico
                      </label>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                      placeholder="tu@correo.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <Lock size={16} className="text-gray-400 mr-2" />
                      <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
                        Contraseña
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                        placeholder="Tu contraseña secreta"
                      />
                      <button 
                        type="button" 
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                    
                    <div className="flex justify-end mt-2">
                      <button 
                        type="button" 
                        className="text-xs text-pink-500 hover:text-pink-600 font-medium"
                        onClick={() => changeTab('reset')}
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                      Recordar sesión
                    </label>
                  </div>
                  
                  <div className="flex-1 flex items-end justify-center w-full mt-6">
                    <button
                      onClick={handleSubmit}
                      className="w-full py-3 px-4 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold rounded-xl transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-lg flex items-center justify-center"
                    >
                      <span>Ingresar</span>
                      <ArrowRight size={18} className="ml-2" />
                    </button>
                  </div>
                  
                  <div className="text-center text-gray-500 text-sm">
                    ¿No tienes cuenta? 
                    <button 
                      onClick={goToRegister} 
                      className="ml-1 text-pink-500 font-medium"
                    >
                      Regístrate aquí
                    </button>
                  </div>
                </div>
              )}
              
              {/* Formulario de recuperación de contraseña */}
              {stage === 'welcome' && activeTab === 'reset' && (
                <div className="space-y-6 h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">¿Olvidaste tu contraseña?</h2>
                  
                  <div className="p-4 bg-pink-50 rounded-lg">
                    <p className="text-gray-600 text-sm">
                      No te preocupes, nos pasa a todos. Ingresa tu correo electrónico y te enviaremos instrucciones para recuperar tu cuenta.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <Mail size={16} className="text-gray-400 mr-2" />
                      <label htmlFor="resetEmail" className="block text-gray-700 text-sm font-medium">
                        Correo electrónico
                      </label>
                    </div>
                    <input
                      type="email"
                      id="resetEmail"
                      name="resetEmail"
                      value={formData.resetEmail}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-50 border ${errors.resetEmail ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                      placeholder="tu@correo.com"
                    />
                    {errors.resetEmail && <p className="text-red-400 text-xs mt-1">{errors.resetEmail}</p>}
                  </div>
                  
                  <div className="flex-1 flex items-end justify-center w-full mt-6">
                    <button
                      onClick={handleSubmit}
                      className="w-full py-3 px-4 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold rounded-xl transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-lg flex items-center justify-center"
                    >
                      <span>Enviar instrucciones</span>
                      <ArrowRight size={18} className="ml-2" />
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <button 
                      onClick={() => changeTab('login')} 
                      className="text-sm text-gray-500 hover:text-pink-500 font-medium"
                    >
                      Volver al inicio de sesión
                    </button>
                  </div>
                </div>
              )}
              
              {/* Formulario de registro */}
              {stage === 'register' && (
                <div className="space-y-4 h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">¡Únete a la aventura!</h2>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <User size={16} className="text-gray-400 mr-2" />
                      <label htmlFor="name" className="block text-gray-700 text-sm font-medium">
                        Nombre completo
                      </label>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.name ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                      placeholder="Tu nombre real"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <User size={16} className="text-gray-400 mr-2" />
                      <label htmlFor="username" className="block text-gray-700 text-sm font-medium">
                        Nombre de usuario
                      </label>
                    </div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.username ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                      placeholder="Cómo te conocerán"
                    />
                    {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <Mail size={16} className="text-gray-400 mr-2" />
                      <label htmlFor="email-reg" className="block text-gray-700 text-sm font-medium">
                        Correo electrónico
                      </label>
                    </div>
                    <input
                      type="email"
                      id="email-reg"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.email ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                      placeholder="tu@correo.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <Lock size={16} className="text-gray-400 mr-2" />
                      <label htmlFor="password-reg" className="block text-gray-700 text-sm font-medium">
                        Contraseña
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="password-reg"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                        placeholder="Mínimo 6 caracteres"
                      />
                      <button 
                        type="button" 
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <Lock size={16} className="text-gray-400 mr-2" />
                      <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium">
                        Confirmar contraseña
                      </label>
                    </div>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-gray-50 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all`}
                      placeholder="Repite tu contraseña"
                    />
                    {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                      Acepto los <span className="text-pink-500 font-medium">términos y condiciones</span>
                    </label>
                  </div>
                  
                  <div className="flex-1 flex items-end justify-center w-full">
                    <button
                      onClick={handleSubmit}
                      className="w-full py-3 px-4 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold rounded-xl transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-lg flex items-center justify-center"
                    >
                      <span>Crear mi cuenta</span>
                      <Heart size={18} className="ml-2" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Decoración lateral */}
            <div className="absolute right-0 top-0 h-full w-12 flex flex-col items-center py-8">
              <div className="flex-1"></div>
              <div className="w-8 h-8 rounded-full bg-cyan-400 mb-4 flex items-center justify-center text-white">
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};

export default PandoraLogin;