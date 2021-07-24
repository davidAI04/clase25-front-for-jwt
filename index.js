class Usuario {
  constructor(name, password) {
    this.name = name;
    this.password = password;
    this.token = "";
  }

  static async guardarUsuario(user) {
    localStorage.setItem("datosUsuario", JSON.stringify(user));
  }

  static async recuperarUsuario() {
    let user = await JSON.parse(localStorage.getItem('datosUsuario'));
    return user;
  }
}

Usuario.guardarUsuario(new Usuario("david", "123456"));

const login = async () => {
  const data = await Usuario.recuperarUsuario();
  const apiCall = await fetch("http://localhost:3003/login", {
    method: 'post',
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: {
      name: data.name,
      password: data.password
    }
  });

  const response = apiCall.json();
  data.token = response.token;
  return data;
}

async function main() {
  const resultado = await login();
  console.log('resultado ->', resultado);
  Usuario.guardarUsuario(resultado);
}

const getUsuarios = async () => {
  const data = await Usuario.recuperarUsuario();
  const apiCall = await fetch("http://localhost:3003/usuarios", {
    method: 'get',
    headers: {
      "Accept": "application/json, text/plain, */*",
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${data.token}`
    }
  });
  const response = apiCall.json();
  return reponse;
}

async function main2() {
  let resultado = await getUsuarios();
  console.log('resultado ->', resultado);
  return resultado
}

async function bootstrap() {
  await main();
  await main2();
}

bootstrap();