import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import {
  Header,
  Button,
  Icon,
  BottomSheet,
  ListItem,
} from "react-native-elements";
import { SafeAreaProvider } from 'react-native-safe-area-context';




import data from "./resource/TransactionData";

export default function App() {

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState(data);
  const [isVisible, setIsVisible] = useState(false);

  const list = [
    {
      title: "Add Amount",
      containerStyle: { backgroundColor: "grey" },
      titleStyle: { color: "white" },
      onPress: () => addTransaction(),
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "" },
      titleStyle: { color: "white" },
      onPress: () => closeBottomSheet(),
    },
  ];

  const closeBottomSheet = () => {
    setIsVisible(false);
    setName("");
    setAmount("");
  };

  const addTransaction = () => {
    setTransactions((prev) => {
      return [
        {
          id: prev.length + 1,
          name,
          amount,
        },
        ...prev,
      ];
    });
    closeBottomSheet();
  };

  const getTotal = () => {
    return transactions.map((tran) => +tran.amount).reduce((a, b) => a + b, 0);
  };

  const getIncome = () => {
    return transactions
      .map((tran) => +tran.amount)
      .filter((amt) => amt > 0)
      .reduce((a, b) => a + b, 0);
  };

  const getExpense = () => {
    return transactions
      .map((tran) => +tran.amount)
      .filter((amt) => amt < 0)
      .reduce((a, b) => a + b, 0);
  };

  const renderTransaction = ({ item }) => {
    const isExpense = item.amount < 0;
    return (
      <View style={[styles.tracker, styles.item]}>
        <Text style={[styles.childText]}>{item.name}</Text>
        <Text
          style={[
            styles.ChildAmount,
            isExpense ? styles.cExpense : styles.cIncome,
          ]}
        >
           {item.amount.toString()}
        </Text>
      </View>
    );
  };

  return (  <SafeAreaProvider>
    <View style={styles.container}>
      <Header
        placement="center"
        centerComponent={{
          text: "Expense",
          titleStyle: { color: "white" },
          style: styles.center,
          
        }}
        containerStyle={styles.header}
      />
      <Text style={[styles.title, styles.total]}> {getTotal()}</Text>
      <View style={styles.tracker}>
        <Text style={[styles.label, styles.income]}> {getIncome()}</Text>
        <Text style={[styles.label, styles.expense]}>
          {Math.abs(getExpense())}
        </Text>
      </View>
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: "rgb(64, 143, 143)" }}
      >
        <TextInput
          style={[styles.input, styles.text]}
          onChangeText={setName}
          value={name}
          placeholder="Enter Name"
        />
        <TextInput
          style={[styles.input, styles.text]}
          onChangeText={setAmount}
          value={amount.toString()}
          placeholder="Amount"
          keyboardType="numeric"
        />
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      
      <Text style={[styles.title, { textAlign: "left", paddingLeft: 5 }]}>
        Recent Transactions
      </Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id.toString()}
      />
      <StatusBar style="auto" />
    </View>
  </SafeAreaProvider>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bordertopColor: "brown",
  },
  header: {
    height: 60,
    
  },
  left: {
    paddingTop: 5,
    color: "White",
  },
  center: {
    fontSize: 20,
    paddingTop: 5,
    color: "black",
    fontWeight: "bold",
  },
  tracker: {
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
  },
   box: {
    width: 100,
    height: 100,
 },
  text: {
    height: 60,
    padding: 15,
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    height: 60,
    padding: 15,
    color: "black",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold itelaic",
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
    color: "white",
    fontSize: 28,
  },
  income: {
    backgroundColor: "grey",
  },
  expense: {
    backgroundColor: "green",
  },
  item: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderColor: "#eee",
    justifyContent: "space-between",
  },
  childText: {
    textAlign: "center",
    fontSize: 23,
  },
  ChildAmount: {
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    backgroundColor: "white",
  },
  cIncome: {
    color: "grey",
  },
  cExpense: {
    color: "green",
  },
});
