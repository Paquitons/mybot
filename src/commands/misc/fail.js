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
      const User = interaction.options.getMember('user');
      const Reason = interaction.options.get('reason').value;
      const improve = interaction.options.get('improvements').value;
      const resultsChannel = await client.channels.fetch("1137160685374165144");
      const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
      const userId = interactionUser.id

    const faildms = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Application Results.')
        .setDescription(`Greetings ${User}! \nThe staff team is deeply sorry to inform you that you have \n**FAILED** the **"Mod Application"** for the following reason: \n\n "${Reason}"\n\n**Ways to improve:** ${improve} \n\n**You may re-apply in 3 days.**\n\nSigned, <@${userId}>`)
    const staffresults = new EmbedBuilder()
      .setColor('#ffffff')
      .setTitle('App Results')
      .setDescription(`**User:** ${User}\n**Condition:** Failed\n**Reason:** ${Reason}\n**Improvements:** ${improve}\n\n**Signed** <@${userId}>`)

    await interaction.reply({ content: "Sent.", ephemeral: true });

    await User.send({ embeds: [faildms] })
    await resultsChannel.send({ embeds: [staffresults] })
    },
    name: 'fail',
    description: `Sends the person who failed the application a DM saying they failed.`,
    options: [
    {
      name: 'user',
      description: 'The user you want to DM.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'reason',
      description: `What's the reason they failed the application?`,
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'improvements',
      description: `What could they improve on?`,
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  };
  