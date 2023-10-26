class Rover {
   // Write code here!
   constructor (position) {
      this.position = position;
      this.mode = "NORMAL"
      this.generatorWatts = 110;
   }

   receiveMessage(message) {

      let resultsArray = [];

      for (let i = 0; i < message.commands.length; i++) {
         if (message.commands[i].commandType === "MOVE") {
            if (this.mode === "NORMAL") {
               this.position = message.commands[i].value;
               resultsArray.push(
                  {completed: true}
               );
            } else if (this.mode === "LOW_POWER") {
               resultsArray.push(
                  {completed: false}
               );
            }
         } else if (message.commands[i].commandType === "STATUS_CHECK") {
            resultsArray.push(
               {
                  completed: true,
                  roverStatus: {
                     mode: this.mode,
                     generatorWatts: this.generatorWatts,
                     position: this.position
                  }
               }
            );
         } else if (message.commands[i].commandType === "MODE_CHANGE") {
            resultsArray.push(
               {completed: true}
            );
            this.mode = message.commands[i].value;
         }
      }

      let results = {
         message: message.name,
         results: resultsArray
      };

      return results;

   }
}

module.exports = Rover;