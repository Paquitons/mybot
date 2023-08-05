const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ComponentType,
  } = require('discord.js');

module.exports = {
    callback: async (client, interaction) => {
        const sayValue = interaction.options.get('say').value;
        const imageValue = interaction.options.get('image').value;
        const shoutChannel = await client.channels.fetch("1135113188938096640");
        const titleValue = interaction.options.get('title').value;
        const shoutEmbed = new EmbedBuilder()
          .setColor('#00698B')
          .setTitle(`${titleValue}`)
          .setDescription(`${sayValue}`)
          .setImage(`${imageValue}`);
          await interaction.reply({ content: "Sent.", ephemeral: true });
          await shoutChannel.send({ content: "||<@&1135994164476137614>||" });
          await shoutChannel.send({ embeds: [shoutEmbed] })
    },

    name: 'shout',
    description: 'Shouts out a message.',
    options: [
    {
      name: 'title',
      description: 'Title of the shout',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
        name: 'say',
        description: 'What you want to say in the shou..',
        type: ApplicationCommandOptionType.String,
        required: true,
    },
    {
      name: 'image',
      description: 'What you want to say in the shou..',
      type: ApplicationCommandOptionType.String,
      required: false,
  },
  ],
  permissionsRequired: [PermissionFlagsBits.BanMembers],
  botPermissions: [PermissionFlagsBits.BanMembers],
  };
  