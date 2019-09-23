const tenant_id = '0a9e1b37-9163-4842-9b4c-cb251c7d76f7';


module.exports = {
    development:{
        tenant_id : tenant_id,
        session_key : 'temp',
        session_max : 60000
    },
    production: {
        tenant_id : tenant_id,
        session_key : 'temp',
        session_max : 60000
    }
}