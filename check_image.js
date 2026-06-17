const fs = require('fs');
// Let's create a script to check if the image has transparency at the top and bottom
// We can use a simple PNG parser or just use a basic buffer check.
// Since we don't have PNG JS libraries installed, we can use the powershell script but escape it correctly.
