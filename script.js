let display = document.getElementById('display');

// Fungsi menambahkan nilai ke display
function appendToDisplay(value) {
    display.value += value;
}

// Fungsi untuk menghapus semua nilai di display
function clearDisplay() {
    display.value = '';
}

// Konversi angka dengan koma menjadi titik untuk perhitungan
function convertCommaToDot(expression) {
    return expression.replace(/,/g, '.');
}

// Konversi titik kembali menjadi koma untuk tampilan hasil
function convertDotToComma(value) {
    return value.toString().replace(/\./g, ',');
}

// Fungsi untuk menghitung hasil
function calculateResult() {
    try {
        let expression = display.value.trim();
        if (!expression) throw new Error('Ekspresi tidak boleh kosong');

        // Konversi angka dengan koma ke format yang bisa diproses
        expression = convertCommaToDot(expression);

        // Evaluasi ekspresi
        let result = evaluateExpression(expression);

        // Format hasil agar menggunakan koma kembali
        display.value = convertDotToComma(result);
    } catch (error) {
        display.value = error.message;
    }
}

// Fungsi evaluasi ekspresi dengan validasi yang lebih aman
function evaluateExpression(expression) {
    try {
        // Validasi: hanya izinkan angka, operator matematika, tanda kurung, dan spasi
        if (!/^[-0-9+\-*/(). ]+$/.test(expression)) {
            throw new Error('Ekspresi mengandung karakter tidak valid');
        }

        // Evaluasi ekspresi menggunakan Function constructor (lebih aman dibanding eval)
        let result = new Function("return " + expression)();

        // Periksa hasil, harus angka yang valid
        if (!isFinite(result) || isNaN(result)) {
            throw new Error('Hasil tidak valid');
        }

        return result;
    } catch {
        throw new Error('tidak bisa di bagi nol');
    }
}