class PentaFunctions {
    generateVerifyCode() {

        const randomFraction = Math.random();
        const sixDigitNumber = Math.floor(randomFraction * (999999 - 100000 + 1)) + 100000;

        return sixDigitNumber;
    }
}
module.exports = PentaFunctions