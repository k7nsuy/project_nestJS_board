export default {
     secret: process.env.JWT_SECRET,
     expiresIn: '1h',
     refreshExpiresIn: '30d'
}