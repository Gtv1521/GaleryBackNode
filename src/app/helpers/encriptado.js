import bcrypt from 'bcryptjs';

const encrypt = async (textPlain) => {
    const hast = await bcrypt.hash(textPlain, 10);
    return hast;
};

const comparar = async (passPlain, passEncript) => {
    return await bcrypt.compare(passPlain, passEncript) 
}

export { encrypt, comparar }