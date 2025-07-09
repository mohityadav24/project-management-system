const User = require('../models/User');
// const jwt = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = async ( req, res) => {
    try {

        const {name, email, password, role} = req.body;

            console.log('Received:', { name, email, password, role });

    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'All fields are required' });
    }


        const existing = await User.findOne({email});
        if(existing){
            return res.status(400).json({msg:'email alread Registerd'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword, role});

        return res.status(201).json({msg:'User Registered '})

    }catch (error){
        return res.status(500).json({msg:'Internal Server Erorr',error: err.message });
    }
};

// exports.login = async (req, res) => {
//     try{
//          const {email, password} = req.body;

//              console.log('Login payload:', { email, password });

//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Email and password are required' });
//     }

//          const user = User.findOne({email});

//          if(!user) return res.status(400).json({msg:'Invailid Credentials'});

//          const isMatch = await bcrypt.compare(password, user.password);
//          if(!isMatch) return res.status(400).json({msg:'Invailid password'});

//          const token = jwt.sign({ id:user._id, role: user.role}, process.env.JWT_SECRET,{
//             expiresIn: '7d'
//          });

//          res.json({
//             token,
//             user:{
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//             }
//          });

//     }catch(err){
//         return res.status(500).json({ msg: 'Server error', error: err.message })
//     }
// }


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login payload:', { email, password });

    // Step 1: Check if email/password exist
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    // Step 2: Check if user exists
    const user = await User.findOne({ email });
    console.log('🔍 Fetched user:', user);

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials (email not found)' });
    }

    // Step 3: Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔑 Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials (password mismatch)' });
    }

    // Step 4: Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('✅ JWT Token created');

    // Step 5: Send response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};