import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#333399",
    justifyContent: "center",
    marginTop: "15%"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: "2%",
    padding: "2%",
    borderWidth: 1,
    borderRadius: 20
  },
  authContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  pageHeader: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: "4%",
    marginRight: "4%",
    marginTop: "4%",
    marginBottom: "2%"
  },
  pageTitle: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "bold"
  },
  subOption: {
    color: "#ee8800",
    fontSize: 24,
    fontWeight: "bold"
  },
  summarize_info: {
    width: "96%",
    backgroundColor: "#eeeeee",
    padding: "2%",
    borderRadius: 20
  },
  summarize_info_row: {
    flexDirection: "row",
    paddingBottom: 2
  },
  summarize_info_element: {
    width: "37%",
    margin: 2,
    paddingRight: 20
  },
  summaryContainer: {
    width: "98%",
    backgroundColor: "#eed",
    marginTop: "2%",
    marginBottom: "2%",
    padding: "6%",
    borderRadius: 20,
    flexGrow: 1
  },
  summaryPreview: {
    width: "98%",
    backgroundColor: "#eed",
    marginTop: "2%",
    marginBottom: "2%",
    padding: "6%",
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1
  },
  drawerHeader: {
    padding: 10,
    alignItems: "center"
  },
  authHeader: {
    alignItems: "center",
    marginBottom: 20
  },
  authColor: {
    color: "#00f"
  },
  drawerContent: {
    backgroundColor: "#eeeeff"
  },
  summary: {
    color: "#221100",
    fontSize: 18,
    marginBottom: "12%",
    textAlign: "justify"
  },
  categoryContainer: {
    width: "98%",
    backgroundColor: "#ffeedd",
    marginBottom: "3%",
    padding: "2%",
    borderRadius: 20
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 6
  },
  textInput: {
    height: 40,
    borderColor: "#3333ee",
    borderWidth: 1,
    width: "90%"
  },
  link: {
    fontWeight: "bold",
    color: "#560cce"
  }
});
