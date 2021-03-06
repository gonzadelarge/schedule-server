const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        todo: [ { type: mongoose.Types.ObjectId, ref: 'Todo' } ],
        meeting: [ { type: mongoose.Types.ObjectId, ref: 'meetings' } ]
    },
    { timestamps: true }
);

const Schedule = mongoose.model('schedule', scheduleSchema);

module.exports = Schedule;