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
      const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
      const improve = interaction.options.get('improvements').value;
      const resultsChannel = await client.channels.fetch("1137160685374165144");
      const userId = interactionUser.id
    const approveEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Application Results.')
        .setDescription(`Congratulations ${User}! \nThe staff team is welcomed to inform you that you have \n**PASSED** the **"Mod Application"** \n\n**Ways to improve:** ${improve}\n\nHere are some tips & tricks that can help you!\nhttps://youtube.com \n\nSigned, <@${userId}>`)
    const staffresults = new EmbedBuilder()
      .setColor('#ffffff')
      .setTitle('App Results')
      .setDescription(`**User:** ${User}\n**Condition:** Passed\n**Improvements:** ${improve}\n\n **Signed:** <@${userId}>`)
    await interaction.reply({ content: "Sent.", ephemeral: true });

    await resultsChannel.send({ embeds: [staffresults] })
    await User.send({ embeds: [approveEmbed] })
    },
    name: 'pass',
    description: `Sends the person who failed the application a DM saying they failed.`,
    options: [
    {
      name: 'user',
      description: 'The user you want to DM.',
      type: ApplicationCommandOptionType.User,
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
  