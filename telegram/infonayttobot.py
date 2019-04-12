# -*- coding: utf-8 -*-

"""
Simple Telegram bot to bridge messages from a channel to the info screen.
See README.md for more details. See also config.py and tgpost.html.
"""

from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import logging
import os
import time
from pprint import pformat
import json
import config

# set up logging
logging.basicConfig(format='%(asctime)s - %(filename)s:%(lineno)d - %(levelname)s - %(message)s',
                    level=logging.INFO)
logger = logging.getLogger(__name__)

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
  # msg should be a telegram.Message object

  chat = msg.chat
  assert chat.type in ["group", "supergroup", "channel"], "update_output_file() called for incorrect chat type {} (chat ID {})".format(chat.type, chat.id)

  # whether we're updating the public channel or one of the group chats
  update_public_channel = chat.id == public_channel_id

  assert chat.username is not None, "update_output_file() called for non-public chat {} ({})".format(chat.id, chat.title)

  try:
    output_data = None
    try:
      with open(output_filename) as f:
        contents = f.read().strip()
        if not contents:
          contents = "{}"
        output_data = json.loads(contents)

    except IOError:
      # file was not found, we will create it
      output_data = {}

    if update_public_channel:
      raise NotImplementedError("update_output_file() not implemented for public_channel yet.")

    else:
      assert chat.id in group_chats_to_follow, "update_output_file() called for chat {} ({}) that was not being followed".format(chat.id, chat.title)

      if "group_chats" not in output_data:
        output_data["group_chats"] = {}

      # use chat.username as key
      output_data["group_chats"][chat.username] = {
          "chat_id": chat.id,
          "title": chat.title,
          "latest_message_id": msg.message_id,
          "username": chat.username,
          }


    with open(output_filename, "w+t") as f:
      f.write(json.dumps(output_data, indent = 4))

  except (IOError, ValueError) as e:
    print("Error with file {}:".format(output_filename))
    print(e)
    raise

def send_start_message(bot, update):
  #NOTE: apply these for all handler functions when python-telegram-bot 0.12 is released:
  # change args from (bot, update) to (update, context)
  # bot = context.bot
  # see https://github.com/python-telegram-bot/python-telegram-bot/wiki/Transition-guide-to-Version-12.0#context-based-callbacks

  raise NotImplementedError("/start message not implemented yet")

def send_help_message(bot, update):
  raise NotImplementedError("/help message not implemented yet")

def forward_message_to_public_channel(msg, anonymize = False):
  raise NotImplementedError("forwarding message to public channel not implemented yet")

  if not anonymize:
    ret = bot.forwardMessage()

def handle_group_message(bot, update):

  msg = update.effective_message
  chat = msg.chat

  logger.info(pformat(msg.to_dict()))
  logger.info(pformat(chat.to_dict()) + "\n")

  if chat.id not in group_chats_to_follow:
    logger.warning("bot received message from group chat with ID {} ({}) but is not configured to follow it".format(chat.id, chat.title))
    return

  if chat.username is None:
    logger.warning("chat {} ({}) is not a public group".format(chat.id, chat.title))
    return

  update_output_file(msg)

def handle_private_message(bot, update):

  raise NotImplementedError("handle_private_message() not implemented")
  msg = update.effective_message
  ret = bot.send_message(public_channel_id, msg.message_id) #TODO
  update_output_file(ret)
  logging.info(ret)

  #TODO: send as not anonymous
  if text.startswith("/lahetaAnonyymina") or text.startswith("/laheta"):
    forward_message_to_public_channel(msg)
    return

  ret = bot.sendMessage(config.public_channel_id, msg["message_id"])
  print("ret", ret)

def handle_error(bot, update, error):
  logger.warning(error)

def flush_messages(bot):
  #TODO
  raise NotImplementedError

def main():

  pwd = os.path.dirname(os.path.abspath(__file__))
  print("changing working directory to {}".format(pwd))
  os.chdir(pwd)

  # based on echobot2 example
  updater = Updater(bot_token)
  dp = updater.dispatcher
  dp.add_handler(CommandHandler("start", send_start_message, filters = Filters.private))
  dp.add_handler(CommandHandler("help", send_help_message, filters = Filters.private))
  dp.add_handler(MessageHandler(Filters.private, handle_private_message)) #TODO
  dp.add_handler(MessageHandler(Filters.group, handle_group_message))
  dp.add_error_handler(handle_error)

  updater.start_polling()

  #flush_messages() #TODO
  print("Listening...")
  updater.idle()

if __name__ == "__main__":
  main()
