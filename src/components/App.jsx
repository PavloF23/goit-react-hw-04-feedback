import { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { AppStyle } from './App.styled';
import {FeedbackList} from './FeedbackList.styled';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [options, setOptions] = useState({ good: 0, neutral: 0, bad: 0 });

  //функція що піддраховує певний отзив;
  const leaveFeedback = option => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [option]: options[option] + 1,
    }));
  };

  //функція що піддраховує кількість отзивів;
  const countTotalFeedback = () => {
    const { good, neutral, bad } = options;
    return good + neutral + bad;
  };

  //функція що підраховує відсоток позитивних отзивів;
  const countPositiveFeedbackPercentage = () => {
    if (!countTotalFeedback()) {
      return 0;
    }
    return Math.round((options.good / countTotalFeedback()) * 100);
  };

 
    return (
      <AppStyle>        
        <FeedbackList>
          <Section title="Please leave feedback">
            <FeedbackOptions 
              options={Object.keys(options)}
              onLeaveFeedback={leaveFeedback}
            />
          </Section>
          <Section title="Statistics">
          {countTotalFeedback() ? (
            <Statistics
              good={options.good}
              neutral={options.neutral}
              bad={options.bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
          </Section>
        </FeedbackList>
      </AppStyle>
    );
}