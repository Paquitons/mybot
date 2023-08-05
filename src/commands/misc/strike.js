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
    const targetUserId = interaction.options.get('user').value;
    const promoteReason = interaction.options.get('reason').value;
    const newrank = interaction.options.get('new-rank').value;
    const role = await interaction.guild.roles.fetch(newrank);
    const targetUser = await interaction.guild.members.fetch(targetUserId);
    const ownerLogs = await client.channels.fetch("1135235682365878282");
    const movements = await client.channels.fetch("1135191505284382731");
    const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
    const userId = interactionUser.id
    const Confirm = await client.channels.fetch("1136150431102418964");
    const targetUserRolePosition = targetUser.roles.highest;
        
    if (targetUser.id === userId) {
        await interaction.reply({ content: "Cannot strike yourself.", ephemeral: true });
        return;
      }

      await interaction.reply({ content: "Sending strike request..", ephemeral: true });
      setTimeout(() => {
        interaction.editReply({ content: `Sent strike request.`, ephemeral: true });
      }, 1000);
      const logsembed = new EmbedBuilder()
          .setColor('#6728d2')
          .setTitle('Strike Logs')
          .setDescription(`<@${userId}> striked ${targetUser} for the following reason: "${promoteReason}"`)
          .setImage(`https://cdn.discordapp.com/attachments/1135155489794166814/1135156320442515547/jackson_county_banner.png`);
      const approvebutton = new ButtonBuilder()
            .setCustomId('approve')
            .setLabel('Approve')
            .setStyle(ButtonStyle.Success);
    const denybutton = new ButtonBuilder()
            .setCustomId('deny')
            .setLabel('Deny')
            .setStyle(ButtonStyle.Danger);

        const approveEmbed = new EmbedBuilder()
          .setColor('#6728d2')
          .setTitle('Strike Request')
          .setDescription(`<@${userId}> wants to strike ${targetUser} for the following reason: "${promoteReason}"`)
          .setImage(`https://cdn.discordapp.com/attachments/1135155489794166814/1135156320442515547/jackson_county_banner.png`);

          const promotions = new EmbedBuilder()
          .setColor('#6728d2')
          .setTitle('🎉  |  Staff Strike  |  🎉')
          .setDescription(`**Staff Username:** ${targetUser}\n**Current-Rank:** <@&${targetUserRolePosition.id}>\n**Strike:** <@&${newrank}>\n**Reasons:** ${promoteReason}\n**Issued By:** <@${userId}>`)
          .setImage(`https://cdn.discordapp.com/attachments/1135523632655896636/1136183120983490611/image.png`);

        const requestRow = new ActionRowBuilder().addComponents(approvebutton, denybutton);
        const reply = await Confirm.send({ embeds: [approveEmbed], components: [requestRow]});
        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.Button,
        });
        collector.on('collect', (interaction) => {
            if (interaction.customId === 'approve') {
                interaction.reply({ content: "Approved.", ephemeral: true });
                ownerLogs.send({ embeds: [logsembed] })
                movements.send({ embeds: [promotions] })
                targetUser.roles.add(role)
                reply.delete()
                return;
            }
            if (interaction.customId === 'deny') {
                interaction.reply({ content: "Denied.", ephemeral: true });
                reply.delete()
                return;
            }
        })
    },
    name: 'strike',
    description: 'Strikes a Staff Member',
    options: [
    {
      name: 'user',
      description: 'The user you want to strike.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason you want to strike.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
        name: 'new-rank',
        description: 'The strike the staff member will recieve. [MUST BE A STRIKE RANK]',
        type: ApplicationCommandOptionType.Role,
        required: true,
    },
  ],
  };
  