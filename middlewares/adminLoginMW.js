const {Admin} = require('../models/admin/admins')

module.exports =async function (req, res, next) {

    const admin = await Admin.find({email: req.session.adminEmail})
    if (!admin[0]) throw new Error(`admin doesn't exist`)

    req.session.adminAuthority = admin[0].authority

    if (admin[0].authority === 'super'){
        next()
    } else {
        throw new Error(`You don't have the necessary permissions to access this page`)
    }
}