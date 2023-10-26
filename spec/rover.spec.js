const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  test("constructor sets position and default values for mode and generatorWatts", function() {

    let TestRover = new Rover (5000);

    expect(TestRover.position).toBe(5000);
    expect(TestRover.mode).toBe("NORMAL");
    expect(TestRover.generatorWatts).toBe(110);

  });

  test("response returned by receiveMessage contains the name of the message", function() {

    let testCommandArray = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let TestMessage = new Message ("Test message with two commands", testCommandArray);
    let TestRover = new Rover (5000);

    expect(TestRover.receiveMessage(TestMessage).message).toBe("Test message with two commands");

  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {

    let testCommandArray = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let TestMessage = new Message ("Test message with two commands", testCommandArray);
    let TestRover = new Rover (5000);

    expect(TestRover.receiveMessage(TestMessage).results).toHaveLength(2);

  });

  test("responds correctly to the status check command", function() {

    let testCommandArray = [new Command ('STATUS_CHECK')];
    let TestMessage = new Message ("Test message with one command", testCommandArray);
    let TestRover = new Rover (5000);

    expect(TestRover.receiveMessage(TestMessage).results[0].roverStatus).toMatchObject(
      {
        mode: "NORMAL",
        generatorWatts: 110,
        position: 5000
      }
    );

  });

  test("responds correctly to the mode change command", function() {

    let testCommandIsLowPowerMode = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let TestMessageIsLowPowerMode = new Message ("Change Mode to Low Power", testCommandIsLowPowerMode);
    let TestRoverIsLowPowerMode = new Rover (5000);

    let testCommandIsNormalMode = [new Command('MODE_CHANGE', 'NORMAL')];
    let TestMessageIsNormalMode = new Message ("Change Mode to Low Power", testCommandIsNormalMode);
    let TestRoverIsNormalMode = new Rover (5000);

    expect(TestRoverIsLowPowerMode.receiveMessage(TestMessageIsLowPowerMode).results[0].completed).toBe(true);
    expect(TestRoverIsLowPowerMode.mode).toBe("LOW_POWER");

    expect(TestRoverIsNormalMode.receiveMessage(TestMessageIsNormalMode).results[0].completed).toBe(true);
    expect(TestRoverIsNormalMode.mode).toBe("NORMAL");

  });

  test("responds correctly to the mode change command", function() {

    let testCommandIsMoveInLowPower = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command ('MOVE', 10000)];
    let TestMessageIsMoveInLowPower = new Message ("Change Mode to 'LOW_POWER' and Move", testCommandIsMoveInLowPower);
    let TestRoverToMoveInLowPower = new Rover (5000);

    let testCommandIsMoveInNormalMode = [new Command('MODE_CHANGE', 'NORMAL'), new Command ('MOVE', 10000)];
    let TestMessageIsMoveInNormalMode = new Message ("Change Mode to 'NORMAL' and Move", testCommandIsMoveInNormalMode);
    let TestRoverToMoveInNormalMode = new Rover (5000);

    expect(TestRoverToMoveInLowPower.receiveMessage(TestMessageIsMoveInLowPower).results[1].completed).toBe(false);

    expect(TestRoverToMoveInNormalMode.receiveMessage(TestMessageIsMoveInNormalMode).results[1].completed).toBe(true);

  });

  test("responds with the position for the move command", function() {

    let testCommandIsMove = [new Command ('MOVE', 10000)];
    let TestMessageIsMove = new Message ("Move rover to new position", testCommandIsMove);
    let TestRoverToMove = new Rover (5000);

    TestRoverToMove.receiveMessage(TestMessageIsMove);

    expect(TestRoverToMove.position).toBe(10000);
    
  });

});
