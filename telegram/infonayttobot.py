# -*- coding: utf-8 -*-

"""
Simple Telegram bot to bridge messages from a channel to the info screen.
See README.md for more details. See also config.py and tgpost.html.
"""

import telepot
from telepot.loop import MessageLoop
import os
import time
from pprint import pprint
import json
import config

bot_token = config.bot_token
assert bot_token, "Bot token missing"

output_filename = config.output_filename
assert output_filename.endswith("json")

public_channel_id = config.public_channel_id
assert abs(public_channel_id) > 1, "Public channel ID missing."

group_chats_to_follow = config.group_chats_to_follow

bot = None

def update_output_file(msg):
  # update latest_message_id to external json file for group chats

  content_type, chat_type, chat_id = telepot.glance(msg)
  assert chat_type in ["group", "supergroup", "channel"], "update_output_file() called for incorrect chat type {} (chat ID {})".format(chat_type, chat_id)

  # groups and channels should have this attribute
  chat_title = msg["chat"]["title"]

  # whether we're updating the public channel or one of the group chats
  update_public_channel = chat_id == public_channel_id

  assert "username" in msg["chat"], "update_output_file() called for non-public chat {} ({})".format(chat_id, chat_title)
  chat_username = msg["chat"]["username"]

  try:
    output_data = None
    try:
      with open(output_filename) as f:
        output_data = json.loads(f.read())

    except IOError:
      # file was not found, we will create it
      output_data = {}

    if update_public_channel:
      raise NotImplementedError("update_output_file() not implemented for public_channel yet.")

    else:
      assert chat_id in group_chats_to_follow, "update_output_file() called for chat {} ({}) that was not being followed".format(chat_id, chat_title)

      if "group_chats" not in output_data:
        output_data["group_chats"] = {}

      output_data["group_chats"][chat_username] = {
          "chat_id": chat_id,
          "title": chat_title,
          "latest_message_id": msg["message_id"],
          "username": chat_username,
          }


    with open(output_filename, "w+t") as f:
      f.write(json.dumps(output_data, indent = 4))

  except (IOError, ValueError) as e:
    print("Error with file {}:".format(output_filename))
    print(e)
    raise

def send_start_message(chat_id):
  raise NotImplementedError("/start message not implemented yet")

def send_message_to_public_channel(msg, anonymize = False):
  raise NotImplementedError("forwarding message to public channel not implemented yet")

  if not anonymize:
    ret = bot.forwardMessage()

def handle_message(msg):
  pprint(msg)
  print("\n")

  content_type, chat_type, chat_id = telepot.glance(msg)

  is_group = chat_type in ["group", "supergroup"]

  if is_group:
    if chat_id not in group_chats_to_follow:
      print("bot received message from group chat with ID {} ({}) but is not configured to follow it".format(chat_id, msg["chat"]["title"]))
      return

    if "username" not in msg["chat"]:
      print("chat {} ({}) is not a public group".format(chat_id, msg["chat"]["title"]))
      return

    update_output_file(msg)

  elif chat_type == "private":
    # private message
    raise NotImplementedError("private messages not implemented yet")

    if content_type == "text":
      text = msg["text"]

      # hairy hat command parsing
      if text.startswith("/start"):
        send_start_message(chat_id)
        return

      if text.startswith("/lahetaAnonyymina") or text.startswith("/laheta"):
        send_message_to_public_channel(msg)
        return

    ret = bot.sendMessage(config.public_channel_id, msg["message_id"])
    print("ret", ret)
  
  return


def flush_messages(bot):
  raise NotImplementedError

def main():
  global bot
  bot = telepot.Bot(bot_token)

  pwd = os.path.dirname(os.path.abspath(__file__))
  print("changing working directory to {}".format(pwd))
  os.chdir(pwd)

  #flush_messages(bot) #TODO
  #TODO: check out telepot filters, add separate handler for private messages etc
  MessageLoop(bot, handle_message).run_as_thread()
  print("Listening...")

  try:
    while True:
      time.sleep(10)

  except KeyboardInterrupt:
    pass

main()
