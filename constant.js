const constant = {
    DATABASE_URI: process.env.DATABASE_URI,

    DATABASE: {
        PERSON: 'persons', // corrected to a string collection name
    },

    USER_TYPES: {
        USER: 'user',
        AGENT: 'agent',
    },

    MESSAGES: {
        FETCHED: 'Resource fetched successfully',
        UPDATED: 'Resource updated successfully',
        ERROR: 'Resource Error',
        CREATED: 'Resource created successfully',
        DELETED: 'Resource deleted successfully',
    },
}

module.exports = constant;