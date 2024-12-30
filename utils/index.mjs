import bcrypt from 'bcrypt';

export const hashPassword = async(password) => {
     const saltRound = 10;  // Number of rounds for salt generation and hashing

     // Generate a salt and hash the password concurrently using a Promise.
    // The resolve() function returns the hashed password and the salt.
    return new Promise((resolve,  reject) => {
        bcrypt.genSalt(saltRound, (err, salt) => {     
            if(err) reject(err)
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) reject(err)
                resolve([hash, salt])
            })
        })
    })  
}

export const comparePassword = async(password, salt) => {
    return new Promise((resolve,  reject) => {
        
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) reject(err)
                resolve(hash)
                })
    
    })
}
