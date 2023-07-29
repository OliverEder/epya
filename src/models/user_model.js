import Sequelize  from "sequelize";
import db from "../config/db.js";

export const User = db.define("user", {
    user_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_alias: {
        type: Sequelize.STRING
    },
    user_name: {
        type: Sequelize.STRING
    },
    user_last_name_p: {
        type: Sequelize.STRING
    },
    user_last_name_m: {
        type: Sequelize.STRING
    },
    user_email: {
        type: Sequelize.STRING
    },
    user_phone: {
        type: Sequelize.STRING
    },
    user_tax_id: {
        type: Sequelize.STRING
    },
    user_avatar: {
        type: Sequelize.STRING
    },
    user_address: {
        type: Sequelize.STRING
    },
    user_session_active: {
        type: Sequelize.STRING
    },
    user_session_alowed: {
        type: Sequelize.STRING
    },
    user_password: {
        type: Sequelize.STRING
    },
    user_created_at: {
        type: Sequelize.DATE
    },
    user_modify_at: {
        type: Sequelize.DATE
    },
    user_group_id: {
        type: Sequelize.INTEGER
    },
    cat_user_type_id: {
        type: Sequelize.INTEGER
    },
    user_status: {
        type: Sequelize.STRING
    }
},{
    freezeTableName: true
})