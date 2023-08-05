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
    const targetUser = await interaction.guild.members.fetch(targetUserId);
    const ownerLogs = await client.channels.fetch("1135235682365878282");
    const movements = await client.channels.fetch("1135191096767561809");
    const role = await interaction.guild.roles.fetch(newrank);
    const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
    const userId = interactionUser.id
    const Confirm = await client.channels.fetch("1136150431102418964");
    const targetUserRolePosition = targetUser.roles.highest;
        
    if (targetUser.id === userId) {
        await interaction.reply({ content: "Cannot demote yourself.", ephemeral: true });
        return;
      }

      await interaction.reply({ content: "Sending demote request..", ephemeral: true });
      setTimeout(() => {
        interaction.editReply({ content: `Sent demote request.`, ephemeral: true });
      }, 1000);
      const logsembed = new EmbedBuilder()
          .setColor('#6728d2')
          .setTitle('Demotion Logs')
          .setDescription(`<@${userId}> demoted ${targetUser} for the following reason: "${promoteReason}"`)
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
          .setTitle('Demotion Request')
          .setDescription(`<@${userId}> wants to demote ${targetUser} for the following reason: "${promoteReason}"`)
          .setImage(`https://cdn.discordapp.com/attachments/1135155489794166814/1135156320442515547/jackson_county_banner.png`);
         
          const promotions = new EmbedBuilder()
          .setColor('#6728d2')
          .setTitle('🎉  |  Staff Demotion  |  🎉')
          .setDescription(`**Staff Username:** ${targetUser}\n**Old-Rank:** <@&${targetUserRolePosition.id}>\n**New-Rank:** <@&${newrank}>\n**Reasons:** ${promoteReason}\n**Issued By:** <@${userId}>`)
          .setImage(`https://cdn.discordapp.com/attachments/1136034150676172850/1136180964389814362/image.png`);

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
                targetUser.roles.remove(targetUserRolePosition)
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
    name: 'demote',
    description: 'Demotes a Staff Member',
    options: [
    {
      name: 'user',
      description: 'The user you want to demote.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason you want to demote.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
        name: 'new-rank',
        description: 'The new rank the staff member will recieve.',
        type: ApplicationCommandOptionType.Role,
        required: true,
      },
  ],
  };
  