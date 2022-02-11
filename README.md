# Content Moderation Javascript Sample

![Platform](https://img.shields.io/badge/platform-JAVASCRIPT-orange.svg)
![Languages](https://img.shields.io/badge/language-JAVASCRIPT-orange.svg)
[![npm](https://img.shields.io/npm/v/sendbird.svg?style=popout&colorB=red)](https://www.npmjs.com/package/sendbird)

## Table of contents

  1. [Introduction](#introduction)
  1. [Before getting started](#before-getting-started)
  1. [Getting started](#getting-started)

<br />

## Introduction

The content moderation sample utilizes the Sendbird Platform SDK to ban a user from a group channel if the message sent is considered to be toxic. The Perspective API analyzes message and returns a decimal score between 0 and 1 ranking how toxic the message is. A webhook is used  Express and Ngrok to connect to the Sendbird server and receieve a request each time a message is sent in an applications group channel.

<br />

## Before getting started

This section shows you the prerequisites you need to set up the Content Moderation Sample for Javascript. If you have any comments or questions regarding bugs and feature requests, visit [Sendbird community](https://community.sendbird.com).

### Requirements

The minimum requirements for Calls SDK for Javascript sample are: 

- Node
- npm (or yarn)
- Modern browser, supporting WebRTC APIs.

<br />

## Getting started

This section gives you information you need to get started with the Content Moderation Sample.

### Installations

1. Use `NodeJS` for your local server: Download and install [`NodeJS`](https://nodejs.org/en/) if your system doesn't have it yet. 

2. Install [`ExpressJS`](https://expressjs.com/), [`GoogleApis`](https://www.npmjs.com/package/googleapis), [`Ngrok`](https://ngrok.com/), and [`Perspective Api Client`](https://github.com/sloria/perspective-api-client).

3. Install the [Sendbird Platform SDK](https://github.com/sendbird/sendbird-platform-sdk-javascript#-local-development) for local development.

### Create a Sendbird application

1. Login or Sign-up for an account on [Sendbird Dashboard](https://dashboard.sendbird.com).
2. Create or select an application on the dashboard.
3. Note your Sendbird application ID for future reference.

### Enable Webhooks

1. On the Sendbird dashboard, navigate to the **Settings** menu. Under Chat, go to Features to enable Webhooks.
2. Go to Settings, under Chat click Webhooks. In Events, select the event that you want to subscribe to. For this sample, click Group Channel and select 'group_channel:message_send' to subscribe to the event where a user sends a message.
3. In Settings under Chat in Webhooks, ensure that the webhook URL is set once Ngrok is installed and running. The Ngrok URL that is generated along with the post method path used in the application will be the webhook URL you want to use to recieve webhook events from the Sendbird server. 

### Create test users

1. On the Sendbird dashboard, navigate to the **Users** menu.
2. Create a new user

### Create Group Channel

1. On the Sendbird dashboard, navigate to the **Group Channels** menu.
2. Create a new group channel

Now that there is a user and a group channel, send a message through the dashboard to test the sample as walk through it.
