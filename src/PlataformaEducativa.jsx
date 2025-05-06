import React, { useState, useEffect } from 'react';
import { Bell, Book, Award, Layout, MessageCircle, User, ChevronRight, Star, Heart, Calendar, MapPin, Shield, Brain, Compass } from 'lucide-react';

const PlataformaEducativa = () => {
  // Estados para controlar la interfaz
  const [seccionActual, setSeccionActual] = useState('zona-aprendizaje');
  const [perfilDrawer, setPerfilDrawer] = useState(false);
  const [notificaciones, setNotificaciones] = useState(3);
  const [mostrarCodigoModal, setMostrarCodigoModal] = useState(false);
  const [codigoInput, setCodigoInput] = useState('');
  
  // Datos de usuario
  const [usuario, setUsuario] = useState({
    nombre: 'Camila',
    avatar: '👧🏽',
    nivel: 2,
    puntos: 145,
    insignias: 3,
    progreso: 35
  });
  
  // Datos del curso
  const cursos = [
    {
      id: 1,
      capitulo: 'Capítulo 1',
      titulo: 'Estereotipos y Redes Sociales',
      imagen: '/api/placeholder/300/180',
      descripcion: 'Descubre y desafía los estereotipos de género en las redes sociales',
      progreso: 75,
      actividadesPendientes: 1,
      icono: '🌟'
    },
    {
      id: 2,
      capitulo: 'Capítulo 2',
      titulo: 'Inteligencia Emocional y Menstruación',
      imagen: '/api/placeholder/300/180',
      descripcion: 'Comprende las emociones durante tu ciclo menstrual',
      progreso: 40,
      actividadesPendientes: 2,
      icono: '❣️'
    },
    {
      id: 3,
      capitulo: 'Capítulo 3',
      titulo: 'Salud Menstrual y Hormonas',
      imagen: '/api/placeholder/300/180',
      descripcion: 'Conoce tu ciclo hormonal y cómo afecta tu cuerpo',
      progreso: 10,
      actividadesPendientes: 3,
      icono: '🌱'
    }
  ];
  
  // Retos activos
  const retos = [
    {
      id: 1,
      titulo: 'Desafía el Estereotipo',
      descripcion: 'Identifica 3 mensajes negativos en redes sociales y crea alternativas positivas',
      puntos: 50,
      tiempo: '3 días',
      completado: false
    },
    {
      id: 2,
      titulo: 'Diario Emocional',
      descripcion: 'Completa 7 días de registro en tu diario emocional',
      puntos: 75,
      tiempo: '7 días',
      completado: false
    }
  ];
  
  // Premios disponibles
  const premios = [
    {
      id: 1,
      nombre: 'Kit Menstrual Sostenible',
      puntos: 200,
      imagen: '/api/placeholder/120/120'
    },
    {
      id: 2,
      nombre: 'Libro "Mujeres que Cambiaron el Mundo"',
      puntos: 150,
      imagen: '/api/placeholder/120/120'
    }
  ];
  
  // Actividades pendientes
  const actividadesPendientes = [
    {
      id: 1,
      titulo: 'Quiz: ¿Qué tanto sabes de tu cuerpo?',
      curso: 'Salud Menstrual y Hormonas',
      fechaLimite: '2 días',
      tipo: 'quiz'
    },
    {
      id: 2,
      titulo: 'Foro: Experiencias con la menstruación',
      curso: 'Inteligencia Emocional y Menstruación',
      fechaLimite: '5 días',
      tipo: 'foro'
    }
  ];
  
  // Insignias desbloqueadas
  const insignias = [
    {
      id: 1,
      nombre: 'Exploradora Digital',
      descripcion: 'Completaste tu perfil y primer acceso',
      imagen: '🚀',
      desbloqueada: true
    },
    {
      id: 2,
      nombre: 'Amiga de su Ciclo',
      descripcion: 'Completaste el Capítulo 3 y aprendiste sobre tu ciclo menstrual',
      imagen: '🌙',
      desbloqueada: true
    },
    {
      id: 3,
      nombre: 'Guardiana del Consentimiento',
      descripcion: 'Completaste los retos del Capítulo 6',
      imagen: '🛡️',
      desbloqueada: false
    }
  ];
  
  // Función para manejar el código QR o secreto
  const manejarCodigoSecreto = () => {
    if (codigoInput.toLowerCase() === 'lobitaluna') {
      // Desbloquear contenido especial o insignia
      setUsuario({...usuario, insignias: usuario.insignias + 1, puntos: usuario.puntos + 25});
      alert('¡Felicidades! Has desbloqueado la insignia "Amiga de su Ciclo" y ganado 25 puntos extra.');
      setMostrarCodigoModal(false);
    } else {
      alert('Código incorrecto. ¡Intenta de nuevo!');
    }
  };
  
  // Componentes de la interfaz
  const MenuLateral = () => (
    <div className="w-64 bg-purple-100 h-screen p-6 flex flex-col">
      <div className="flex items-center mb-8">
        <div className="text-4xl mr-3">{usuario.avatar}</div>
        <div>
          <h3 className="text-lg font-bold text-purple-800">¡Hola, {usuario.nombre}!</h3>
          <p className="text-sm text-purple-600">Nivel {usuario.nivel} · {usuario.puntos} pts</p>
        </div>
      </div>
      
      <div className="space-y-4 flex-grow">
        <button 
          onClick={() => setSeccionActual('zona-aprendizaje')} 
          className={`flex items-center w-full p-3 rounded-lg ${seccionActual === 'zona-aprendizaje' ? 'bg-purple-200 text-purple-800' : 'text-purple-700 hover:bg-purple-200'}`}
        >
          <Layout className="mr-3 h-5 w-5" />
          <span>Zona de Aprendizaje</span>
        </button>
        
        <button 
          onClick={() => setSeccionActual('cursos')}
          className={`flex items-center w-full p-3 rounded-lg ${seccionActual === 'cursos' ? 'bg-purple-200 text-purple-800' : 'text-purple-700 hover:bg-purple-200'}`}
        >
          <Book className="mr-3 h-5 w-5" />
          <span>Mis Cursos</span>
        </button>
        
        <button 
          onClick={() => setSeccionActual('retos')}
          className={`flex items-center w-full p-3 rounded-lg ${seccionActual === 'retos' ? 'bg-purple-200 text-purple-800' : 'text-purple-700 hover:bg-purple-200'}`}
        >
          <Star className="mr-3 h-5 w-5" />
          <span>Retos</span>
        </button>
        
        <button 
          onClick={() => setSeccionActual('foros')}
          className={`flex items-center w-full p-3 rounded-lg ${seccionActual === 'foros' ? 'bg-purple-200 text-purple-800' : 'text-purple-700 hover:bg-purple-200'}`}
        >
          <MessageCircle className="mr-3 h-5 w-5" />
          <span>Foros</span>
        </button>
        
        <button 
          onClick={() => setSeccionActual('insignias')}
          className={`flex items-center w-full p-3 rounded-lg ${seccionActual === 'insignias' ? 'bg-purple-200 text-purple-800' : 'text-purple-700 hover:bg-purple-200'}`}
        >
          <Award className="mr-3 h-5 w-5" />
          <span>Mis Insignias</span>
        </button>
      </div>
      
      <div className="mt-auto pt-4 border-t border-purple-200">
        <button
          onClick={() => setMostrarCodigoModal(true)}
          className="w-full py-2 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          Ingresar Código Secreto
        </button>
      </div>
    </div>
  );
  
  const Cabecera = () => (
    <div className="bg-white p-4 border-b border-purple-100 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-purple-800">Cesi y Lobita Luna</h1>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setPerfilDrawer(!perfilDrawer)}
          className="relative p-2 rounded-full hover:bg-purple-100"
        >
          <User className="h-6 w-6 text-purple-700" />
        </button>
        <button className="relative p-2 rounded-full hover:bg-purple-100">
          <Bell className="h-6 w-6 text-purple-700" />
          {notificaciones > 0 && (
            <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificaciones}
            </span>
          )}
        </button>
      </div>
    </div>
  );
  
  const ZonaAprendizaje = () => (
    <div className="p-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-2">¡Bienvenida a tu Zona de Aprendizaje!</h2>
        <p className="opacity-90">Continúa tu viaje con Cesi y Lobita Luna explorando los cursos, completando actividades y ganando insignias.</p>
        <div className="mt-4 bg-white/20 rounded-full h-3">
          <div 
            className="bg-white rounded-full h-3" 
            style={{width: `${usuario.progreso}%`}}
          ></div>
        </div>
        <div className="mt-2 text-sm">{usuario.progreso}% completado</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-purple-800">Cursos en Progreso</h3>
            <button 
              onClick={() => setSeccionActual('cursos')}
              className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
            >
              Ver todos <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          {cursos.slice(0, 2).map(curso => (
            <div key={curso.id} className="mb-4 border-b border-purple-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-start">
                <div className="text-3xl mr-3">{curso.icono}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-purple-800">{curso.titulo}</h4>
                  <div className="text-sm text-gray-500 mb-2">{curso.capitulo}</div>
                  <div className="w-full bg-purple-100 rounded-full h-2 mb-1">
                    <div 
                      className="bg-purple-500 rounded-full h-2" 
                      style={{width: `${curso.progreso}%`}}
                    ></div>
                  </div>
                  <div className="text-xs text-purple-600">{curso.progreso}% completado</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-purple-800">Actividades Pendientes</h3>
            <span className="bg-pink-100 text-pink-600 text-sm px-2 py-1 rounded-full">
              {actividadesPendientes.length} pendientes
            </span>
          </div>
          
          {actividadesPendientes.map(actividad => (
            <div key={actividad.id} className="mb-4 border-b border-purple-100 pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium text-purple-800">{actividad.titulo}</h4>
                  <div className="text-sm text-gray-500">{actividad.curso}</div>
                </div>
                <div className="text-sm text-pink-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {actividad.fechaLimite}
                </div>
              </div>
              <button className="mt-2 w-full py-1.5 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors">
                Ir a la actividad
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-purple-800">Mis Retos Activos</h3>
            <button 
              onClick={() => setSeccionActual('retos')}
              className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
            >
              Ver todos <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          {retos.map(reto => (
            <div key={reto.id} className="mb-4 border-b border-purple-100 pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium text-purple-800">{reto.titulo}</h4>
                  <div className="text-sm text-gray-500">{reto.descripcion}</div>
                </div>
                <div className="text-sm text-purple-600 bg-purple-50 h-min px-2 py-1 rounded-full">
                  {reto.puntos} pts
                </div>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-pink-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {reto.tiempo} restantes
                </span>
                <button className="text-purple-600 hover:text-purple-800">
                  Iniciar reto
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-purple-800">Mis Insignias</h3>
            <button 
              onClick={() => setSeccionActual('insignias')}
              className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
            >
              Ver todas <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex justify-around">
            {insignias.filter(insignia => insignia.desbloqueada).map(insignia => (
              <div key={insignia.id} className="text-center">
                <div className="text-4xl mb-2">{insignia.imagen}</div>
                <div className="text-sm font-medium text-purple-800">{insignia.nombre}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-purple-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{usuario.insignias} de 12 insignias desbloqueadas</span>
              <span className="text-purple-600">{Math.round((usuario.insignias/12)*100)}%</span>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-2 mt-1">
              <div 
                className="bg-purple-500 rounded-full h-2" 
                style={{width: `${(usuario.insignias/12)*100}%`}}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const Cursos = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-800">Mis Cursos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.map(curso => (
          <div key={curso.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img 
              src={curso.imagen} 
              alt={curso.titulo} 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <div className="text-xs text-purple-600 font-medium mb-1">{curso.capitulo}</div>
              <h3 className="font-bold text-purple-800 mb-2">{curso.titulo}</h3>
              <p className="text-sm text-gray-600 mb-4">{curso.descripcion}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progreso</span>
                  <span className="text-purple-600">{curso.progreso}%</span>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-2">
                  <div 
                    className="bg-purple-500 rounded-full h-2" 
                    style={{width: `${curso.progreso}%`}}
                  ></div>
                </div>
              </div>
              
              <button className="w-full py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors">
                Continuar
              </button>
            </div>
          </div>
        ))}
        
        <div className="bg-purple-50 rounded-xl shadow-sm border-2 border-dashed border-purple-200 flex flex-col items-center justify-center p-6">
          <div className="text-4xl text-purple-400 mb-2">🔍</div>
          <h3 className="font-bold text-purple-800 mb-1">Explorar más cursos</h3>
          <p className="text-sm text-center text-purple-600 mb-4">Descubre nuevos capítulos y contenido</p>
          <button className="py-2 px-4 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors">
            Ver catálogo
          </button>
        </div>
      </div>
    </div>
  );
  
  const Retos = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-800">Retos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {retos.map(reto => (
          <div key={reto.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-purple-800">{reto.titulo}</h3>
              <div className="text-sm text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                {reto.puntos} pts
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{reto.descripcion}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-pink-500 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {reto.tiempo} restantes
              </span>
              <button className="py-1.5 px-3 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors">
                Iniciar reto
              </button>
            </div>
          </div>
        ))}
        
        {/* Reto especial vinculado a la cartilla física */}
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold">Reto Especial: Código Secreto</h3>
            <div className="text-sm bg-white/20 px-2 py-1 rounded-full">
              100 pts
            </div>
          </div>
          <p className="text-sm opacity-90 mb-4">Busca el código secreto en la página 15 de tu cartilla y desbloquea contenido extra en la plataforma.</p>
          <div className="flex justify-between items-center">
            <span className="text-sm flex items-center opacity-80">
              <Book className="h-4 w-4 mr-1" />
              Vinculado a la cartilla
            </span>
            <button 
              onClick={() => setMostrarCodigoModal(true)}
              className="py-1.5 px-3 bg-white hover:bg-white/90 text-purple-600 text-sm font-medium rounded-lg transition-colors"
            >
              Ingresar código
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  const Foros = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-800">Foros de Discusión</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="bg-purple-50 p-3 rounded-lg mb-4">
            <h3 className="font-bold text-purple-800 mb-1">¿Qué reglas de las redes sociales son injustas para las mujeres?</h3>
            <div className="text-sm text-gray-600 mb-2">Foro del Capítulo 1: Estereotipos y Redes Sociales</div>
            <div className="flex items-center text-sm text-purple-600">
              <MessageCircle className="h-4 w-4 mr-1" />
              15 comentarios
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-purple-800 font-bold">
                M
              </div>
              <div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="font-medium text-purple-800 mb-1">María, 14 años</div>
                  <p className="text-sm text-gray-600">En mi experiencia, las redes sociales son mucho más estrictas con el cuerpo femenino. Mi hermano puede subir fotos sin camiseta, pero a mis amigas las censuran por mostrar los hombros en clase de deporte.</p>
                </div>
                <div className="flex text-xs text-purple-600 mt-1 space-x-4">
                  <button className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" />
                    8 Me gusta
                  </button>
                  <button className="flex items-center">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Responder
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-purple-800 font-bold">
                L
              </div>
              <div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="font-medium text-purple-800 mb-1">Laura, 15 años</div>
                  <p className="text-sm text-gray-600">También he notado que cuando las chicas opinamos sobre videojuegos o deportes, recibimos muchos más comentarios negativos que los chicos. Como si tuviéramos que "demostrar" que realmente nos gusta ese tema.</p>
                </div>
                <div className="flex text-xs text-purple-600 mt-1 space-x-4">
                  <button className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" />
                    12 Me gusta
                  </button>
                  <button className="flex items-center">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Responder
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-purple-100">
            <textarea 
              placeholder="Escribe tu comentario..." 
              className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button className="py-1.5 px-4 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors">
                Comentar
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="font-bold text-purple-800 mb-4">Foros Activos</h3>
            
            <div className="space-y-3">
              <div className="p-3 border border-purple-100 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                <h4 className="font-medium text-purple-800">Experiencias con la menstruación</h4>
                <div className="text-sm text-gray-600 mb-1">Capítulo 2: Inteligencia Emocional y Menstruación</div>
                <div className="flex items-center text-xs text-purple-600">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  23 comentarios
                </div>
              </div>
              
              <div className="p-3 border border-purple-100 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                <h4 className="font-medium text-purple-800">Preguntas sobre anatomía femenina</h4>
                <div className="text-sm text-gray-600 mb-1">Capítulo 5: Sexualidad y Anatomía</div>
                <div className="flex items-center text-xs text-purple-600">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  17 comentarios
                </div>
              </div>
              
              <div className="p-3 border border-purple-100 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                <h4 className="font-medium text-purple-800">¿Cómo decir NO cuando me siento presionada?</h4>
                <div className="text-sm text-gray-600 mb-1">Capítulo 6: Consentimiento y Autonomía</div>
                <div className="flex items-center text-xs text-purple-600">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  9 comentarios
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
            <h3 className="font-bold mb-2">¿Tienes una pregunta para las expertas?</h3>
            <p className="text-sm opacity-90 mb-4">Nuestras ginecólogas y psicólogas aliadas están disponibles para responder tus preguntas de forma segura y anónima.</p>
            <button className="py-2 px-4 bg-white text-purple-600 rounded-lg hover:bg-white/90 transition-colors">
              Hacer una pregunta anónima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  const Insignias = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-800">Mis Insignias</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{usuario.insignias} de 12 insignias desbloqueadas</span>
            <span className="text-purple-600">{Math.round((usuario.insignias/12)*100)}%</span>
          </div>
          <div className="w-full bg-purple-100 rounded-full h-2 mt-1">
            <div 
              className="bg-purple-500 rounded-full h-2" 
              style={{width: `${(usuario.insignias/12)*100}%`}}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {insignias.map(insignia => (
          <div key={insignia.id} className={`bg-white rounded-xl shadow-sm p-4 text-center ${!insignia.desbloqueada ? 'opacity-50' : ''}`}>
            <div className="text-5xl mb-3">{insignia.imagen}</div>
            <h3 className="font-bold text-purple-800 mb-1">{insignia.nombre}</h3>
            <p className="text-xs text-gray-600 mb-2">{insignia.descripcion}</p>
            {!insignia.desbloqueada && (
              <div className="text-xs bg-purple-100 text-purple-600 py-1 px-2 rounded-full inline-block">
                Bloqueada
              </div>
            )}
          </div>
        ))}
        
        {/* Otras insignias por desbloquear */}
        <div className="bg-white rounded-xl shadow-sm p-4 text-center opacity-50">
          <div className="text-5xl mb-3">🌈</div>
          <h3 className="font-bold text-purple-800 mb-1">Aliada Diversa</h3>
          <p className="text-xs text-gray-600 mb-2">Completaste el reto de diversidad del Capítulo 1</p>
          <div className="text-xs bg-purple-100 text-purple-600 py-1 px-2 rounded-full inline-block">
            Bloqueada
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 text-center opacity-50">
          <div className="text-5xl mb-3">📝</div>
          <h3 className="font-bold text-purple-800 mb-1">Exploradora Emocional</h3>
          <p className="text-xs text-gray-600 mb-2">Completaste 7 días de diario emocional</p>
          <div className="text-xs bg-purple-100 text-purple-600 py-1 px-2 rounded-full inline-block">
            Bloqueada
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 text-center opacity-50">
          <div className="text-5xl mb-3">🧬</div>
          <h3 className="font-bold text-purple-800 mb-1">Conocedora del Cuerpo</h3>
          <p className="text-xs text-gray-600 mb-2">Obtuviste 100% en el quiz de anatomía</p>
          <div className="text-xs bg-purple-100 text-purple-600 py-1 px-2 rounded-full inline-block">
            Bloqueada
          </div>
        </div>
      </div>
    </div>
  );
  
  // Modal para ingresar el código secreto
  const CodigoSecretoModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-purple-800 mb-4">Ingresar Código Secreto</h3>
        <p className="text-sm text-gray-600 mb-4">Encuentra códigos secretos en tu cartilla física y desbloquea contenido especial, insignias y puntos extra.</p>
        
        <input
          type="text"
          placeholder="Escribe el código aquí..."
          className="w-full p-3 border border-purple-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={codigoInput}
          onChange={(e) => setCodigoInput(e.target.value)}
        />
        
        <div className="flex justify-end space-x-3">
          <button 
            onClick={() => setMostrarCodigoModal(false)}
            className="py-2 px-4 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50"
          >
            Cancelar
          </button>
          <button 
            onClick={manejarCodigoSecreto}
            className="py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Verificar
          </button>
        </div>
      </div>
    </div>
  );
  
  // Componente principal
  return (
    <div className="flex h-screen bg-purple-50 text-gray-800">
      <MenuLateral />
      
      <div className="flex-1 flex flex-col overflow-auto">
        <Cabecera />
        
        <main className="flex-1 overflow-auto">
          {seccionActual === 'zona-aprendizaje' && <ZonaAprendizaje />}
          {seccionActual === 'cursos' && <Cursos />}
          {seccionActual === 'retos' && <Retos />}
          {seccionActual === 'foros' && <Foros />}
          {seccionActual === 'insignias' && <Insignias />}
        </main>
      </div>
      
      {/* Drawer de perfil (simplificado) */}
      {perfilDrawer && (
        <div className="fixed right-0 top-0 h-screen bg-white shadow-lg w-80 p-6 z-40">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-purple-800">Mi Perfil</h3>
            <button 
              onClick={() => setPerfilDrawer(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">{usuario.avatar}</div>
            <h4 className="font-bold text-purple-800 text-lg">{usuario.nombre}</h4>
            <p className="text-sm text-gray-600">Nivel {usuario.nivel} · {usuario.puntos} puntos</p>
            <button className="mt-2 text-sm text-purple-600 hover:text-purple-800">
              Personalizar avatar
            </button>
          </div>
          
          <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 mb-4">
            Editar perfil
          </button>
          
          <button className="w-full py-2 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50">
            Cerrar sesión
          </button>
        </div>
      )}
      
      {/* Modal de código secreto */}
      {mostrarCodigoModal && <CodigoSecretoModal />}
    </div>
  );
};

export default PlataformaEducativa;