import User from "../models/User.js";
import { sendEmailVerify } from "../emails/authEmailService.js";
import { generateJWT } from "../utils/index.js";

const register = async (req, res) => {
  const { email, password } = req.body;

  // Validar que todos los campos estén completos
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");
    return res.status(400).json({
      msg: error.message,
    });
  }

  // Validar la extensión del password
  const MIN_PASSWORD_LENGTH = 6;
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    const error = new Error(
      `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`,
    );
    return res.status(400).json({
      msg: error.message,
    });
  }

  // Evitar registros duplicados
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("El usuario ya está registrado");
    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    const user = new User(req.body);
    const savedUser = await user.save();

    // Enviar un email de confirmación
    const { name, email, token } = savedUser;
    await sendEmailVerify({
      name,
      email,
      token,
    });

    res.json({
      msg: "Usuario creado correctamente, revisa tu email para activar tu cuenta.",
      user: savedUser,
    });
  } catch (error) {
    console.log("Error al crear el usuario", error);
    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

const verifyAccount = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ token });

    if (!user) {
      const error = new Error(
        "Hubo un error al verificar tu cuenta. Inténtalo de nuevo.",
      );
      return res.status(401).json({
        msg: error.message,
      });
    }

    // Confirmar el usuario
    user.verified = true;
    user.token = "";

    // Guardar en la base de datos
    await user.save();

    res.json({
      msg: "Cuenta verificada correctamente. Ahora puedes iniciar sesión.",
    });
  } catch (error) {
    console.log("Error al verificar el usuario", error);
    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validar que todos los campos estén completos
  if (!email || !password) {
    return res.status(400).json({
      msg: "Todos los campos son obligatorios",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "El usuario no existe",
      });
    }

    // Comprobar si ha no sido verificado
    if (!user.verified) {
      return res.status(400).json({
        msg: "El usuario no ha sido confirmado. Por favor, confirma tu cuenta.",
      });
    }

    // Revisar el password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        msg: "Contraseña incorrecta. Inténtalo de nuevo.",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user._id);

    res.json({
      msg: "Inicio de sesión exitoso",
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log("Error al iniciar sesión", error);
    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

const user = async (req, res) => {
  // Extraer el user del authMiddleware
  const { user } = req;

  res.json(user);
};

export { register, verifyAccount, login, user };
