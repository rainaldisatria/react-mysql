const sequelize = require('sequelize')
const db = require('../db')

const tabel_obat = db.define(
    "tabel_obat",
    {
        Kode_Obat: { type: sequelize.STRING, primaryKey: true },
        Nama_Obat: { type: sequelize.STRING },
        Bentuk_Obat: { type: sequelize.ENUM('Salep', 'Syrup', 'Kaplet', 'Tablet') },
        Tgl_Produksi: { type: sequelize.DATE },
        Tgl_Kadaluarsa: { type: sequelize.DATE },
        Harga_Satuan: { type: sequelize.INTEGER },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = tabel_obat;