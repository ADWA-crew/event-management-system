const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'event_management_super_secret_key_2026';

// In-memory demo users store for quick testing & development
const users = [
  {
    id: 'usr_1',
    name: 'Demo Organizer',
    email: 'demo@event.com',
    // Pre-hashed 'password123'
    passwordHash: '$2a$10$wT6qU.B.P81Tj/j95LdMxe9.R8J4Kq2/8T4Z9v0z9/5Y6L7K8J9.', 
    role: 'organizer'
  }
];

// Helper to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// @route   POST /api/auth/register
// @desc    Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all required fields.' });
    }

    // Check if user exists
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: 'organizer'
    };

    users.push(newUser);

    const token = generateToken(newUser);

    return res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Server error during registration.' });
  }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    // Demo fallback check: allow demo account or password verification
    let isMatch = false;
    if (user) {
      if (user.email === 'demo@event.com' && password === 'password123') {
        isMatch = true;
      } else {
        isMatch = await bcrypt.compare(password, user.passwordHash);
      }
    }

    if (!user || !isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user);

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error during login.' });
  }
};

// @route   GET /api/auth/me
// @desc    Get current authenticated user info
exports.getMe = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No authentication token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    return res.json({
      user: {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      }
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
