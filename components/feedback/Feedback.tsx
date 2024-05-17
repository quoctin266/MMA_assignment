import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import moment from "moment";
import { IFeedbackProps } from "@/types/props.dt";

function Feedback(props: IFeedbackProps) {
  const { feedback } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{feedback.author}</Text>

      <View style={styles.header}>
        <StarRatingDisplay
          rating={feedback.rating}
          starSize={18}
          starStyle={{ marginHorizontal: 0 }}
          color="#faaf00"
        />
        <Text style={styles.time}>
          {moment(feedback.date).format("DD/MM/YYYY")}
        </Text>
      </View>

      <Text style={styles.content}>{feedback.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  time: {
    fontSize: 13,
    color: "#312651",
  },
  content: {
    fontSize: 15,
  },
});

export default Feedback;
