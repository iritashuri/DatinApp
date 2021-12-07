import React, { CSSProperties } from "react";
import { topBar } from "../utils/emotions";
import AppLogo from "./AppLogo";

const style: CSSProperties = {
  position: "sticky",
  top: 0,
  left: 0,
  right: 0
}

const renderHeader = () => {
  return (<>
            <AppLogo />
            <a href="/Home">Home</a>{"  "}
            <a href="/Inbox">Inbox</a>{"  "}
            <a href="/Settings">Settings</a>{"  "}
            <a href="/Welcome">LogOut</a>{"  "}
          </> 
  );
}

const TopBar: React.FC = () => {
  return (
    <>
      <nav css={topBar} style={style}>
        {renderHeader()}
      </nav>
      <div>
        Jdate If finding a partner that shares your Jewish faith is a top
        priority, consider checking out Jdate. You can even find matches
        anonymously thanks to the site's LookBook feature, which allows you to
        leave a heart on the profiles that you feel would be a good fit. If both
        of you "heart" each other, you'll be notified of the mutual attraction.
        try Jdate Hinge Hinge calls itself "The Dating App Designed to Be
        Deleted," so that's promising right from the outset! It boasts an entire
        Hinge Lab Team that works behind the scenes to perfect the science
        behind online dating. The app uses your location to find potential
        matches in your area and asks each user to complete a series of prompts
        rather than relying on the usual questions. The end goal is to find a
        serious relationship rather than a casual fling. try Hinge Bumble While
        Bumble has expanded into the business world recently with Bumble
        Bizz, it got its start as a plain old dating app. The app lets women
        make the first move, and lets you add up to six photos and link your
        Instagram and Spotify pages to make your profile look more official.
        After you complete your profile, the app works much the same as some of
        the others on this list—simply swipe to find your preferred people! try
        Bumble OkCupid OkCupid uses both a website and a handy app, so you can
        find matches from your computer or straight from your phone if you
        prefer. It's considered the best free dating site out there, and has the
        numbers to back it up. The site boasts more than 91 million matches
        every year, and users go on an average of 50 thousand dates every week.
        try OkCupid Coffee Meets Bagel If the name "Coffee Meets Bagel" sounds
        familiar, it's probably because you saw it on Shark Tank. Founded by
        sisters Soo, Dawoon, and Arum Kang, the ladies-first app wants to make
        sure that you actually see all your matches, so they deliver six matches
        who have already liked your profile at noon every single day. After
        discovering that men were twice as active on dating apps than women
        were, the founders worked with women what they actually wanted—and
        Coffee Meets Bagel is the result. try Coffee Meets Bagel Her Her prides
        itself on being the #1 dating app and safe space for LGBTQ+ and queer
        folks who are looking for love—and it's currently over eight million
        users strong. It allows users to join smaller community-focused group
        chats, find singles within their area, or just make a few new friends.
        There are also free and premium paid-for versions of the app. try Her
        Happn Happn is a location-based dating app that's designed for you to
        meet-cute with the singles that you already cross paths with throughout
        your day. The app uses your location to show you a personalized timeline
        of singles who frequent the places that you already go—or who are in the
        same room as you swipe. try Happn XO If your least favorite thing about
        dating is wading through awkward get-to-know you conversations with
        strangers, then XO might just be the solution you've been looking for.
        The app turns up the social aspect of dating with fun games and
        conversation starters that give users a fun, stress-free way to get to
        know each other before diving into more romantic discussions. try XO
        Pickable Pickable isn't the only female-focused dating app on the
        market, but it does take the premise to the greatest extreme. While apps
        like Bumble give women the power of making the first move, Pickable goes
        a step further by letting women swipe anonymously—you don't need to
        upload a picture, include your name, or even create a profile on the app
        to browse the men who are available to meet there. When you do feel like
        being seen and letting dudes on the app request chats, you can add a
        photo temporarily and set a time limit. During that time, you're
        "pickable," and after the clock runs out, your picture will be taken
        down again. It's ultimate, total control for women in the app-based
        dating scene. try Pickable Badoo In terms of sheer numbers, Badoo leads
        the way in the dating app world. Badoo's high number of users—521
        million and counting—is thanks to a combination of factors, from being
        early to the game (it launched in 2006) to being available in several
        countries around the world. By 2011, Wired UK was already describing
        Badoo as a "mass phenomenon" in Brazil, Mexico, France, Spain, and
        Italy. In 2017, the app underwent a massive redesign and now brands
        itself as being for more than just dating, making it a strong option for
        people just looking to make platonic friends, too. try Badoo Raya Raya
        is known as the "celebrity dating app," but you don't technically have
        to be a celebrity to join. Still, it is ultra-exclusive and, unlike most
        dating apps, requires an application to join. According to Raya's
        website, "Anyone interested in joining must fill out an application."
        And don't expect the admission process to be easy. Only about 8 percent
        of applications are accepted, which is lower than the rate of admission
        to some Ivy League universities. If you are granted admission to the
        Raya community, you're expected to pay $8/month in membership dues for
        access to the app. try Raya MeetMindful If you're looking to meet
        someone who shares your life philosophy and overall vibe and said
        philosophy and overall vibe is all about mindfulness and holistic
        wellbeing, then MeetMindful might just be the app you've been waiting
        for. Niche dating apps and websites are nothing new, from
        religious-based options like Christian Mingle and J-Date to
        lifestyle-driven hubs like the much-mocked FarmersOnly.com. MeetMindful
        just takes that basic, tried-and-true concept and brings it firmly into
        2020 with a lifestyle category that's much more likely to speak to urban
        millennials today. try MeetMindful S'more We all know the struggle of
        selecting the perfect set of photos for a dating app—can a few photos
        really represent you?—so what if we took all that snap judgement and
        hot-or-not BS out of it? Gone is the concept of swiping right or left
        based on looks; instead, S'more users first establish connections based
        on mutual interests. How it works: Each day you'll receive recommended
        profiles based on your previous activity on the app (the algorithm takes
        into account the kind of people you swipe 'yes' to the most), but the
        matches' photos are blurred and only become visible when you engage with
        the profile more. Whether that's asking the other person a question, or
        sending them a "wink" to let them know you're interested, the photo will
        slowly become more discernible as you get to know each other. try S'more
        Jdate If finding a partner that shares your Jewish faith is a top
        priority, consider checking out Jdate. You can even find matches
        anonymously thanks to the site's LookBook feature, which allows you to
        leave a heart on the profiles that you feel would be a good fit. If both
        of you "heart" each other, you'll be notified of the mutual attraction.
        try Jdate Hinge Hinge calls itself "The Dating App Designed to Be
        Deleted," so that's promising right from the outset! It boasts an entire
        Hinge Lab Team that works behind the scenes to perfect the science
        behind online dating. The app uses your location to find potential
        matches in your area and asks each user to complete a series of prompts
        rather than relying on the usual questions. The end goal is to find a
        serious relationship rather than a casual fling. try Hinge Bumble While
        Bumble has expanded into the business world recently with Bumble
        Bizz, it got its start as a plain old dating app. The app lets women
        make the first move, and lets you add up to six photos and link your
        Instagram and Spotify pages to make your profile look more official.
        After you complete your profile, the app works much the same as some of
        the others on this list—simply swipe to find your preferred people! try
        Bumble OkCupid OkCupid uses both a website and a handy app, so you can
        find matches from your computer or straight from your phone if you
        prefer. It's considered the best free dating site out there, and has the
        numbers to back it up. The site boasts more than 91 million matches
        every year, and users go on an average of 50 thousand dates every week.
        try OkCupid Coffee Meets Bagel If the name "Coffee Meets Bagel" sounds
        familiar, it's probably because you saw it on Shark Tank. Founded by
        sisters Soo, Dawoon, and Arum Kang, the ladies-first app wants to make
        sure that you actually see all your matches, so they deliver six matches
        who have already liked your profile at noon every single day. After
        discovering that men were twice as active on dating apps than women
        were, the founders worked with women what they actually wanted—and
        Coffee Meets Bagel is the result. try Coffee Meets Bagel Her Her prides
        itself on being the #1 dating app and safe space for LGBTQ+ and queer
        folks who are looking for love—and it's currently over eight million
        users strong. It allows users to join smaller community-focused group
        chats, find singles within their area, or just make a few new friends.
        There are also free and premium paid-for versions of the app. try Her
        Happn Happn is a location-based dating app that's designed for you to
        meet-cute with the singles that you already cross paths with throughout
        your day. The app uses your location to show you a personalized timeline
        of singles who frequent the places that you already go—or who are in the
        same room as you swipe. try Happn XO If your least favorite thing about
        dating is wading through awkward get-to-know you conversations with
        strangers, then XO might just be the solution you've been looking for.
        The app turns up the social aspect of dating with fun games and
        conversation starters that give users a fun, stress-free way to get to
        know each other before diving into more romantic discussions. try XO
        Pickable Pickable isn't the only female-focused dating app on the
        market, but it does take the premise to the greatest extreme. While apps
        like Bumble give women the power of making the first move, Pickable goes
        a step further by letting women swipe anonymously—you don't need to
        upload a picture, include your name, or even create a profile on the app
        to browse the men who are available to meet there. When you do feel like
        being seen and letting dudes on the app request chats, you can add a
        photo temporarily and set a time limit. During that time, you're
        "pickable," and after the clock runs out, your picture will be taken
        down again. It's ultimate, total control for women in the app-based
        dating scene. try Pickable Badoo In terms of sheer numbers, Badoo leads
        the way in the dating app world. Badoo's high number of users—521
        million and counting—is thanks to a combination of factors, from being
        early to the game (it launched in 2006) to being available in several
        countries around the world. By 2011, Wired UK was already describing
        Badoo as a "mass phenomenon" in Brazil, Mexico, France, Spain, and
        Italy. In 2017, the app underwent a massive redesign and now brands
        itself as being for more than just dating, making it a strong option for
        people just looking to make platonic friends, too. try Badoo Raya Raya
        is known as the "celebrity dating app," but you don't technically have
        to be a celebrity to join. Still, it is ultra-exclusive and, unlike most
        dating apps, requires an application to join. According to Raya's
        website, "Anyone interested in joining must fill out an application."
        And don't expect the admission process to be easy. Only about 8 percent
        of applications are accepted, which is lower than the rate of admission
        to some Ivy League universities. If you are granted admission to the
        Raya community, you're expected to pay $8/month in membership dues for
        access to the app. try Raya MeetMindful If you're looking to meet
        someone who shares your life philosophy and overall vibe and said
        philosophy and overall vibe is all about mindfulness and holistic
        wellbeing, then MeetMindful might just be the app you've been waiting
        for. Niche dating apps and websites are nothing new, from
        religious-based options like Christian Mingle and J-Date to
        lifestyle-driven hubs like the much-mocked FarmersOnly.com. MeetMindful
        just takes that basic, tried-and-true concept and brings it firmly into
        2020 with a lifestyle category that's much more likely to speak to urban
        millennials today. try MeetMindful S'more We all know the struggle of
        selecting the perfect set of photos for a dating app—can a few photos
        really represent you?—so what if we took all that snap judgement and
        hot-or-not BS out of it? Gone is the concept of swiping right or left
        based on looks; instead, S'more users first establish connections based
        on mutual interests. How it works: Each day you'll receive recommended
        profiles based on your previous activity on the app (the algorithm takes
        into account the kind of people you swipe 'yes' to the most), but the
        matches' photos are blurred and only become visible when you engage with
        the profile more. Whether that's asking the other person a question, or
        sending them a "wink" to let them know you're interested, the photo will
        slowly become more discernible as you get to know each other. try S'more
      </div>
    </>
  );
};

export default TopBar;
