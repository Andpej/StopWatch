import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList } from 'react-native';
import TimeFormatter from 'minutes-seconds-milliseconds';

const laps = [ // Hardcoded laps
  { name: 'lap 1', value: '00.00.01', key: '1' },
  { name: 'lap 2', value: '00.00.02', key: '2' },
  { name: 'lap 3', value: '00.00.03', key: '3' },
  { name: 'lap 4', value: '00.00.04', key: '4' },
  { name: 'lap 5', value: '00.00.05', key: '5' },
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: laps,
      running: false,
      mainTimer: null,
      lapTimer: null,
      mainTimerStart: null,
      lapTimerStart: null,
    };
  }

  startStopButton() {
    const { running } = this.state;

    // Start button pressed
    this.setState({
      mainTimerStart: new Date(),
      lapTimerStart: new Date(),
      running: true,
    });

    // Stop button pressed
    if (running) {
      clearInterval(this.interval);
      this.setState({
        running: false,
      });
      return;
    }

    this.interval = setInterval(() => {
      this.setState({
        mainTimer: (new Date() - this.state.mainTimerStart) + mainTimer,
        lapTimer: (new Date() - this.state.lapTimerStart) + lapTimer,
      });
    }, 30);
  }

  lapResetButton() {
    const { running, mainTimerStart } = this.state;

    if (mainTimerStart && !running) { // Reset button is pressed
      this.setState({
        mainTimerStart: null,
        lapTimerStart: null,
        mainTimer: 0,
        lapTimer: 0,
      });
    }

    // ADD A CASE WHEN LAP BUTTON IS PRESSED
  }

  renderLaps() { // Renders the hardcoded laps
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={lapRow}>
              <Text style={lapNumber}>{item.name}</Text>
              <Text style={lapTime}>{item.value}</Text>
            </View>
          )}
        />
      </View>
    );
  }

  renderButtons() { // Renders the buttons
    return (
      <View style={buttonWrapper}>
        <TouchableHighlight underlayColor="#fff" onPress={this.lapResetButton.bind(this)} style={button}>
          <Text>{ (this.state.mainTimerStart && !this.state.running) ? 'Reset' : 'Lap'}</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#fff" onPress={this.startStopButton.bind(this)} style={button}>
          <Text style={[startBtn, this.state.running && stopBtn]}>{this.state.running ? 'Stop' : 'Start'}</Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderTimers() { // Renders the timers
    return (
      <View style={timeWrapper}>
        <View style={timerWrapperInner}>
          <Text style={lapTimer}>{TimeFormatter(this.state.lapTimer)}</Text>
          <Text style={mainTimer}>{TimeFormatter(this.state.mainTimer)}</Text>
        </View>
      </View>
    );
  }

  renderHeader() { // Renders the header
    return (
      <View style={header}>
        <Text style={headerTitle}>Stopwatch</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={container}>
        <View style={top}>
          {this.renderHeader()}
          {this.renderTimers()}
        </View>
        <View style={bottom}>
          {this.renderButtons()}
          {this.renderLaps()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    borderBottomWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#F9F9F9',
  },

  headerTitle: {
    alignSelf: 'center',
    fontWeight: '600',
  },

  timeWrapper: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    flex: 1,
  },

  top: {
    flex: 1,
  },

  bottom: {
    flex: 2,
    backgroundColor: '#F0EFF5',
  },

  timerWrapperInner: {
    alignSelf: 'center',
  },

  mainTimer: {
    fontSize: 60,
    fontWeight: '100',
    alignSelf: 'flex-end',

  },

  lapTimer: {
    fontSize: 18,
    alignSelf: 'flex-end',
  },

  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 30,
  },

  button: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
    paddingTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  lapNumber: {
    fontSize: 16,
    color: '#777',
  },
  lapTime: {
    color: '#000',
    fontSize: 20,
    fontWeight: '300',
  },

  startBtn: {
    color: '#00cc00',
  },

  stopBtn: {
    color: 'red',
  },

});

const { // Deconstruction from styles object
  stopBtn, startBtn, lapTime, lapNumber, lapRow, button,
  buttonWrapper, lapTimer, mainTimer, timerWrapperInner, bottom,
  top, timeWrapper, headerTitle, header, container,
} = styles;
