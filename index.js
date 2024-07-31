const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.urlencoded({ extended: true }));

// Static files serve karna
app.use(express.static('public'));

app.post('/start', upload.single('messageFile'), (req, res) => {
    const { phone, target, delayTime, pairingCode } = req.body;
    const messageFile = req.file;

    // Pairing code verification
    if (pairingCode !== '64A66SVF') {
        return res.status(400).send('Invalid pairing code');
    }

    // Message file aur doosre details ko process karna
    const messageFilePath = path.join(__dirname, messageFile.path);
    const messageContent = fs.readFileSync(messageFilePath, 'utf-8');

    // WhatsApp ke through message bhejna
    console.log(Sending message from ${phone} to ${target} with delay ${delayTime}s);
    console.log(Message content: ${messageContent});

    // Success message bhejna
    res.send('Message sent successfully!');
});

// Server ko start karna
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});